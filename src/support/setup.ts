import { check, sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

import { EnvironmentConfigurations } from './configurations';
import { getAsyncClientApi } from './graphql';
import { Call } from '../graphql/support/call';
import { FAP } from '../graphql/support/fap';
import { Instrument } from '../graphql/support/instrument';
import { Template } from '../graphql/support/template';
import { SharedData, UserLogin, Call as CallType } from '../utils/sharedType';

export async function sc1Setup(environmentConfig: EnvironmentConfigurations) {
  /************
      Check if the system under test and user setup server are available.
      Abort load testing if the system is not available.
      
    ************/
  let retryCount = 0;
  let proposalHealthCheck = false;
  let users = null;
  let testCall: CallType | null = null;
  const browserBaseUrl = __ENV.BROWSER_BASE_URL || 'http://localhost:8081';
  const graphqlUrl = __ENV.GRAPHQL_URL || 'http://localhost:8081/grapgql';
  const testSetupBaseUrl = __ENV.TEST_SETUP_URL || 'http://localhost:8100';
  const apiAsyncClient = getAsyncClientApi(
    graphqlUrl,
    environmentConfig.GRAPHQL_TOKEN
  );
  const call = new Call(apiAsyncClient);
  const fap = new FAP(apiClient);
  const template = new Template(apiAsyncClient);

  console.log(`Attempting setup ${environmentConfig.SETUP_RETRIES} times`);
  while (!proposalHealthCheck && retryCount < environmentConfig.SETUP_RETRIES) {
    if (!proposalHealthCheck) {
      // Check for successful proposal health check flags
      const response = http.get(`${browserBaseUrl}/health`);
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
      `${testSetupBaseUrl}/users/${environmentConfig.SETUP_TOTAL_USERS}`
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
      exec.test.abort();
    }
  }
  if (environmentConfig.SETUP_TEST_REVIEWERS === 'true') {
    console.log('we landed here!!');
    if (Array.isArray(users)) {
      const userLogin = users as UserLogin[];
      const reviewerUsers = userLogin.slice(0, 6);
      const reviewerIds = reviewerUsers.map((users) => String(users.userId));
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
      if (__ENV.TEST_SETUP_FAP_ID) {
        const reviewerIds = reviewerUsers.map((users) => users.userId);
        fap.assignReviewersToFap(reviewerIds, Number(__ENV.TEST_SETUP_FAP_ID));
        console.log(`assigned users to fap id ${__ENV.TEST_SETUP_FAP_ID}`);
      }
    }
  }
  //
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
      testCall = await call.getCall(+__ENV.TEST_SETUP_CALL_ID);
    } else {
      testCall = await call.createTestCall(
        (await template.createTemplate()).templateId
      );
      if (testCall) {
        const instrument = new Instrument(apiAsyncClient);
        const callInstrument = await instrument.createInstrument(1);
        if (callInstrument) {
          const callWithInstruments = await call.assignInstrumentsToCall(
            testCall.id,
            callInstrument.id
          );
          testCall.instruments = [...callWithInstruments.instruments];
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

  return {
    users,
    browserBaseUrl,
    graphqlUrl,
    testCall,
    testSetupBaseUrl,
    isClusterTestRun: environmentConfig.IS_CLUSTER_TEST_RUN === 'true' || false,
    instrumentId: environmentConfig.INSTRUMENT_ID,
  } as SharedData;
}
