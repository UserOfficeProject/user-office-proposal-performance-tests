import { check, sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

import { EnvironmentConfigurations } from './configurations';
import { getClientApi } from './graphql';
import { Call } from '../graphql/support/call';
import { Instrument } from '../graphql/support/instrument';
import { Template } from '../graphql/support/template';
import { SharedData } from '../utils/sharedType';

export async function sc1Setup(environmentConfig: EnvironmentConfigurations) {
  /************
      Check if the system under test and user setup server are available.
      Abort load testing if the system is not available.
      
    ************/
  let retryCount = 0;
  let proposalHealthCheck = false;
  let users = null;
  let testCall = null;
  const browserBaseUrl = __ENV.BROWSER_BASE_URL || 'http://localhost:8081';
  const graphqlUrl = __ENV.GRAPHQL_URL || 'http://localhost:8081/grapgql';
  const testSetupBaseUrl = __ENV.TEST_SETUP_URL || 'http://localhost:8100';
  const apiClient = getClientApi(graphqlUrl, environmentConfig.GRAPHQL_TOKEN);
  const call = new Call(apiClient);
  const template = new Template(apiClient);

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
  const response = http.post(
    `${testSetupBaseUrl}/users/${environmentConfig.USER_STARTING_ID}/${environmentConfig.USER_STARTING_ID + environmentConfig.SETUP_TOTAL_USERS}`,
    '',
    {
      headers: { 'Content-Type': 'application/json' },
    }
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
  // Check for final setup outcome and abort if necessary
  if (!proposalHealthCheck || !users) {
    console.error(
      `Setup failed after ${environmentConfig.SETUP_RETRIES} attempts. Aborting test!`
    );
    if (!users) {
      console.error('Failed to create users');
    }
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

  if (__ENV.TEST_SETUP_CALL_ID) {
    testCall = call.getCall(+__ENV.TEST_SETUP_CALL_ID);
  } else {
    testCall = call.createTestCall(template.createTemplate().templateId);
    if (testCall) {
      const instrument = new Instrument(apiClient);
      const callInstrument = instrument.createInstrument(1);
      if (callInstrument) {
        const callWithInstruments = call.assignInstrumentsToCall(
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

  return {
    users,
    browserBaseUrl,
    graphqlUrl,
    testCall,
    testSetupBaseUrl,
  } as SharedData;
}
