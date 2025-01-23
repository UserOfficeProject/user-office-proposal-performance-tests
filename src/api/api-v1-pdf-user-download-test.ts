import { check, sleep } from 'k6';
import http from 'k6/http';
import { getEnvironmentConfigurations } from '../support/configurations';
import exec from 'k6/execution';
import { UserLogin } from '../utils/sharedType';
import { randomIntBetween } from '../utils/helperFunctions';
import { generateBearerToken, getAsyncClientApi } from '../support/graphql';
import { Proposal } from '../graphql/support/proposal';
import { Counter } from 'k6/metrics';
import { User } from '../graphql/support/user';

const environmentConfig = getEnvironmentConfigurations();
const testVus=+__ENV.K6_PS_VUS || 50;
const testIterations= +__ENV.K6_PS_ITERATIONS|| 250;
const downloadedProposalsByPk = new Counter('downloaded_proposals_by_pk', false);
const apiAsyncClient = getAsyncClientApi(
  environmentConfig.GRAPHQL_URL,
  environmentConfig.GRAPHQL_TOKEN
);

const proposal = new Proposal(apiAsyncClient);
type TestData = {
  testUser: UserLogin;
  proposal: {
    primaryKey: number;
    users: { id: number }[];
    proposalId: string;
    title: string;
    abstract: string;
  };
}[];

export const options = {
  discardResponseBodies: false,
  thresholds: {
    http_req_failed: ['rate<0.05'],
    checks: ['rate>0.90'],
  },
  scenarios: {
    user_proposals_download: {
      executor: 'shared-iterations',
      vus: testVus,
      iterations: Math.max(testVus,testIterations),
      maxDuration: '20m',
    },
  },
};

export async function setup() {
  const testData: unknown[] = [];

  const testSetupResponse = http.get(
    `${environmentConfig.TEST_SETUP_URL}/users/${environmentConfig.SETUP_TOTAL_USERS}`
  );
  if (testSetupResponse.status !== 200) {
    console.error('Failed to get test users');
    exec.test.abort();
  }
  const users = [...(testSetupResponse.json() as UserLogin[])];
  if (__ENV.TEST_SETUP_CALL_ID) {
    const callProposals = await proposal.getProposals(
      +__ENV.TEST_SETUP_CALL_ID
    );
    if (callProposals && users.length > 0) {
      
      callProposals.map(async (callProposal) => {
        const testUser = users[randomIntBetween(0, users.length - 1)];
        const isUserOnProposal =callProposal.users.filter((user) => user.id === testUser.userId).length > 0;
        if (!isUserOnProposal) {
          const updatedProposal = await proposal.updateProposal(
            callProposal.primaryKey,
            callProposal.title,
            callProposal.abstract,
            [...callProposal.users.map((user) => user.id), testUser.userId]
          );
          if (updatedProposal) {
            testData.push({
              testUser: testUser,
              proposal: {
                primaryKey: callProposal.primaryKey,
                users: updatedProposal.users,
                proposalId: callProposal.proposalId,
                title: callProposal.title,
                abstract: callProposal.abstract,
              },
            });
          }
        } else {
          testData.push({
            testUser: testUser,
            proposal: {
              primaryKey: callProposal.primaryKey,
              users: callProposal.users,
              proposalId: callProposal.proposalId,
              title: callProposal.title,
              abstract: callProposal.abstract,
            },
          });
        }
      });
    }
  } else {
    console.error('Test Call ID not set');
    exec.test.abort();
  }
 
  return testData as TestData;
  
}
export default async function (sharedData: TestData) {
  const testData = sharedData[randomIntBetween(0, sharedData.length - 1)];
  const user = new User(apiAsyncClient);
  sleep(10);
  const userToken = await user.getUserToken(testData.testUser.sessionId);
  sleep(10);
  const headers = {
    authorization: generateBearerToken(userToken)
  };
  //User download proposal by primary key
    const responsePk = await http.asyncRequest('GET', `${environmentConfig.BROWSER_BASE_URL}/download/pdf/proposal/${testData.proposal.primaryKey}`,null,{
      headers,
    });
    check(responsePk, {
      'Proposal pdf downloaded by primary key': (res) => {
        if(res.headers['Content-Type'] !== 'application/pdf'){
          return false
        }
        downloadedProposalsByPk.add(1);
        return true;
      },
    });

}

export async function teardown(sharedData: TestData) {
  sharedData.forEach(async (data) => {
    await proposal.updateProposal(
      data.proposal.primaryKey,
      data.proposal.title,
      data.proposal.abstract,
      [
        ...data.proposal.users
          .filter((user) => user.id > 1)
          .map((user) => user.id),
      ]
    );
  });
  return;
}
