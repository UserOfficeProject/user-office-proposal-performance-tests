import { check } from 'k6';
import http from 'k6/http';
import { getEnvironmentConfigurations } from '../support/configurations';
import exec from 'k6/execution';
import { randomIntBetween } from '../utils/helperFunctions';
import { generateBearerToken, getAsyncClientApi } from '../support/graphql';
import { Proposal } from '../graphql/support/proposal';
import { Counter } from 'k6/metrics';

const environmentConfig = getEnvironmentConfigurations();
const testVus=+__ENV.K6_PS_VUS || 50;
const testIterations= +__ENV.K6_PS_ITERATIONS|| 250;
const downloadedProposalsByPk = new Counter(
  'downloaded_proposals_by_pk',
  false
);
const downloadedProposalsById = new Counter(
  'downloaded_proposals_by_id',
  false
);
const apiAsyncClient = getAsyncClientApi(
  environmentConfig.GRAPHQL_URL,
  environmentConfig.GRAPHQL_TOKEN
);

const proposal = new Proposal(apiAsyncClient);
type TestData = {
  proposal: {
    primaryKey: number;
    proposalId: string;
  };
}[];

export const options = {
  discardResponseBodies: false,
  thresholds: {
    http_req_failed: ['rate<0.05'],
    checks: ['rate>0.90'],
  },
  scenarios: {
    token_proposals_download: {
      executor: 'shared-iterations',
      vus: testVus,
      iterations: Math.max(testVus,testIterations),
      maxDuration: '20m',
    },
  },
};
export async function setup() {
  const testData: unknown[] = [];
  if (__ENV.TEST_SETUP_CALL_ID) {
    const callProposals = await proposal.getProposals(
      +__ENV.TEST_SETUP_CALL_ID
    );
    if (callProposals) {
      callProposals.map(async (callProposal) => {
        testData.push({
          proposal: {
            primaryKey: callProposal.primaryKey,
            proposalId: callProposal.proposalId,
          },
        });
      });
    }else {
      console.error('Fail to get test proposals');
      exec.test.abort();
    }
  } else {
    console.error('Test Call ID not set');
    exec.test.abort();
  }

  return testData as TestData;
}
export default async function (sharedData: TestData) {
  const testData = sharedData[randomIntBetween(0, sharedData.length - 1)];

  const headers = {
    authorization: generateBearerToken(environmentConfig.GRAPHQL_TOKEN),
  };

  //User download proposal by primary key
  const responsePk = await http.asyncRequest(
    'GET',
    `${environmentConfig.BROWSER_BASE_URL}/download/pdf/proposal/${testData.proposal.primaryKey}`,
    null,
    {
      headers,
    }
  );
  check(responsePk, {
    'Proposal pdf downloaded by primary key': (res) => {
      if (res.headers['Content-Type'] !== 'application/pdf') {
        return false;
      }
      downloadedProposalsByPk.add(1);
      return true;
    },
  });

  //"User download proposal by proposal id"
  const responseId = await http.asyncRequest(
    'GET',
    `${environmentConfig.BROWSER_BASE_URL}/download/pdf/proposal/${testData.proposal.proposalId}?filter=id`,
    null,
    {
      headers,
    }
  );
  check(responseId, {
    'Proposal pdf downloaded by proposal id': (res) => {
      if (res.headers['Content-Type'] !== 'application/pdf') {
        return false;
      }
      downloadedProposalsById.add(1);
      return true;
    },
  });
}
