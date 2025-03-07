import { check, sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

import { EnvironmentConfigurations } from './configurations';
import { getAsyncClientApi } from './graphql';
import { Call } from '../graphql/support/call';
import { FAP } from '../graphql/support/fap';
import { Instrument } from '../graphql/support/instrument';
import { Proposal } from '../graphql/support/proposal';
import { Template } from '../graphql/support/template';
import { User } from '../graphql/support/user';
import {
  SharedData,
  UserLogin,
  Call as CallType,
  Proposal as ProposalType,
  FapReviewAssignment,
} from '../utils/sharedType';

export async function sc1SetupFapReview(
  environmentConfig: EnvironmentConfigurations
) {
  /************
      Check if the system under test and user setup server are available.
      Abort load testing if the system is not available.
      
    ************/
  let retryCount = 0;
  let proposalHealthCheck = false;
  let users = null;
  let testCall: CallType | null = null;
  let testProposals: ProposalType[];
  let testFapId: number;
  const fapReviewAssignments: FapReviewAssignment[] = [];
  const testSetupBaseUrl = __ENV.TEST_SETUP_URL || 'http://localhost:8100';
  const apiAsyncClient = getAsyncClientApi(
    environmentConfig.GRAPHQL_URL,
    environmentConfig.GRAPHQL_TOKEN
  );
  const call = new Call(apiAsyncClient);
  const template = new Template(apiAsyncClient);
  const fap = new FAP(apiAsyncClient);
  const user = new User(apiAsyncClient);
  const proposal = new Proposal(apiAsyncClient);

  console.log(`Attempting setup ${environmentConfig.SETUP_RETRIES} times`);
  while (!proposalHealthCheck && retryCount < environmentConfig.SETUP_RETRIES) {
    if (!proposalHealthCheck) {
      // Check for successful proposal health check flags
      const response = http.get(`${environmentConfig.BROWSER_BASE_URL}/health`);
      check(response, {
        'Proposal health check successful': (r) => {
          const status = r.status === 200;
          if (status) {
            proposalHealthCheck = true;
          }

          return status;
        },
      });

      if (!proposalHealthCheck) {
        console.warn(
          `Proposal health check failed! (retry #${
            retryCount + 1
          }) Retrying in ${10} seconds...`
        );
        sleep(environmentConfig.SETUP_RETRY_INTERVAL); // Adjust retry delay as needed
        retryCount++;
      }
    }
  }
  if (environmentConfig.SETUP_TEST_USERS === 'true') {
    const response = http.get(
      `${environmentConfig.TEST_SETUP_URL}/users/${environmentConfig.SETUP_TOTAL_USERS}`
    );
    check(response, {
      'User auth setup successful': (r) => {
        const status = r.status === 200;
        if (status) {
          users = response.json();
        }

        return status;
      },
    });

    if (!users) {
      console.error(
        `Setup failed after ${environmentConfig.SETUP_RETRIES} attempts. Aborting test!`
      );
      console.error('Failed to get test users');
      exec.test.abort();
    }
  }

  // Check for final setup outcome and abort if necessary
  if (!proposalHealthCheck) {
    console.error(
      `Setup failed after ${environmentConfig.SETUP_RETRIES} attempts. Aborting test!`
    );
    exec.test.abort();

    return;
  } else {
    console.info(
      `Setup successful ${
        retryCount > 0
          ? 'after ' + retryCount + ' attempts'
          : 'on first attempt'
      } `
    );
  }
  if (environmentConfig.SETUP_TEST_CALL === 'true') {
    if (__ENV.TEST_SETUP_CALL_ID) {
      testCall = (await call.getCall(+__ENV.TEST_SETUP_CALL_ID)) as CallType;
    } else {
      testCall = (await call.createTestCall(
        (await template.createTemplate()).templateId
      )) as CallType;
      if (testCall) {
        const instrument = new Instrument(apiAsyncClient);
        const callInstrument = await instrument.createInstrument(1);
        if (callInstrument) {
          const callWithInstruments = await call.assignInstrumentsToCall(
            testCall.id,
            callInstrument.id
          );
          if (callWithInstruments) {
            callWithInstruments.instruments.map((instrument) => {
              testCall!.instruments.push({
                description: instrument.description,
                id: instrument.id,
                managerUserId: instrument.managerUserId,
                name: instrument.name,
                shortCode: instrument.shortCode,
              });
            });
          }
        } else {
          console.error('Failed to create instrument aborting test');
          exec.test.abort();
        }
      }
    }

    if (!testCall) {
      console.error('Failed to create test call aborting test');
      exec.test.abort();
    }
  }

  if (environmentConfig.SETUP_TEST_REVIEWERS === 'true') {
    if (Array.isArray(users)) {
      const userLogin = users as UserLogin[];
      const reviewerUsers = userLogin.slice(
        0,
        Number(__ENV.SETUP_TOTAL_REVIEWERS)
      );
      const reviewerIds = reviewerUsers.map((users) => String(users.userId));
      console.info(`the user ids going to be reviewers will be ${reviewerIds}`);
      const payLoad = JSON.stringify({
        ids: reviewerIds,
        roleName: environmentConfig.SETUP_TEST_REVIEWER_ROLE,
      });
      const res = await http.asyncRequest(
        'POST',
        `${testSetupBaseUrl}/users/assignRole`,
        payLoad,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`response status ${res.status}`);

      if (testCall?.faps) {
        testFapId = testCall?.faps[0].id;
        if (testFapId) {
          for (const index in reviewerUsers) {
            Promise.resolve(
              await user.getUserToken(`${reviewerUsers[index].sessionId}`)
            ).then(async () => {
              Promise.resolve(
                await fap.assignReviewersToFap(
                  [reviewerUsers[index].userId],
                  testFapId
                )
              ).then((value) =>
                console.log(`assigned reviewers to FAP id ${value.id}`)
              );
            });
          }
        }
        testProposals = await proposal.getProposals(
          testCall?.id ? testCall?.id : 0
        );
        if (testProposals) {
          const testFapProposals = testProposals.slice(
            0,
            Number(__ENV.FAP_PROPOSALS)
          );
          const testFapProposalKeys = testFapProposals.map((p) => p.primaryKey);
          const proposalStatusChanged = await proposal.changeProposalsStatus(
            testFapProposalKeys,
            Number(__ENV.FAP_REVIEW_STATUS_ID)
          );
          if (proposalStatusChanged) {
            const instrumentsAssigned =
              await proposal.assignProposalsToInstruments(testFapProposalKeys, [
                Number(__ENV.TEST_SET_UP_INSTRUMENT_ID),
              ]);

            if (instrumentsAssigned) {
              const proposalsAssignedToFap = await fap.assignProposalsToFaps(
                testFapProposalKeys,
                testFapId,
                Number(__ENV.TEST_SET_UP_INSTRUMENT_ID)
              );
              if (proposalsAssignedToFap) {
                const reviewerIterator = reviewerUsers.entries();
                let j = 0;
                for (const entry of reviewerIterator) {
                  const [, userLogin] = entry;
                  let i = 0;
                  while (i < Number(__ENV.PROPOSALS_PER_REVIEWER)) {
                    j = j >= testFapProposals.length ? 0 : j;
                    const assignment = {
                      memberId: userLogin.userId,
                      proposalPk: testFapProposals[j].primaryKey,
                      fapId: testFapId,
                    };
                    fapReviewAssignments.push(assignment);
                    const reviewersAssigned =
                      await fap.assignFapReviewersToProposals(
                        userLogin.userId,
                        testFapProposals[j].primaryKey,
                        testFapId
                      );
                    if (reviewersAssigned) {
                      console.log(
                        `Fap reviewer ${userLogin.userId} assigned to proposal ${testFapProposals[j].proposalId}`
                      );
                    }
                    j++;
                    i++;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    users,
    browserBaseUrl: environmentConfig.BROWSER_BASE_URL,
    graphqlUrl: environmentConfig.GRAPHQL_URL,
    testCall,
    testSetupBaseUrl: environmentConfig.TEST_SETUP_URL,
    isClusterTestRun: environmentConfig.IS_CLUSTER_TEST_RUN === 'true' || false,
    instrumentId: environmentConfig.INSTRUMENT_ID,
    fapReviewAssignments,
  } as SharedData;
}
