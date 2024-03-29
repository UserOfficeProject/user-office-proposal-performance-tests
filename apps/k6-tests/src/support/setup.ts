import { check, sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

import { EnvironmentConfigurations } from './configurations';
import { getTokenApi } from './graphql';
import { Call } from '../graphql/support/call';
import { SharedData } from '../utils/sharedType';

export function sc1TearDown(sharedData: SharedData) {
  console.log('Cleaning up user set up');
  const response = http.del(`${sharedData.userSetupBaseUrl}/`, null, {});
  check(response, {
    'User setup clean up successful': (r) => r.status === 204, // Expected status code for successful deletion
  });
}

export function sc1Setup(environmentConfig: EnvironmentConfigurations) {
  /************
      Check if the system under test and user setup server are available.
      Abort load testing if the system is not available.
      
    ************/
  let retryCount = 0;
  let proposalHealthCheck = false;
  let userSetupHealthCheck = false;
  let users = undefined;

  const browserBaseUrl = __ENV.BROWSER_BASE_URL || 'http://localhost:8081';
  const graphqlUrl = __ENV.GRAPHQL_URL || 'http://localhost:8081/grapgql';
  const userSetupBaseUrl =
    __ENV.USER_SETUP_BASE_URL || 'http://localhost:8100/users';
  const apiClient = getTokenApi(graphqlUrl, environmentConfig.GRAPHQL_TOKEN);
  const call = new Call(apiClient);
  const testCall = call.createTestCall();

  console.log(`Attempting setup ${environmentConfig.SETUP_RETRIES} times`);
  while (
    !(proposalHealthCheck && userSetupHealthCheck) &&
    retryCount < environmentConfig.SETUP_RETRIES
  ) {
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
      }
    }

    if (!userSetupHealthCheck) {
      const response = http.post(
        `${userSetupBaseUrl}/${environmentConfig.SETUP_TOTAL_USERS}`,
        '',
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      check(response, {
        'User auth setup successful': (r) => {
          const status = r.status === 200;
          if (status) {
            userSetupHealthCheck = true;
            users = response.json();
          }

          return status;
        },
      });

      if (!userSetupHealthCheck) {
        // eslint-disable-next-line no-console
        console.warn(
          `User auth setup failed! (retry #${
            retryCount + 1
          }) Retrying in ${10} seconds...`
        );
      }
    }

    if (!proposalHealthCheck || !userSetupHealthCheck) {
      sleep(environmentConfig.SETUP_RETRY_INTERVAL); // Adjust retry delay as needed
      retryCount++;
    }
  }

  // Check for final setup outcome and abort if necessary
  if (!proposalHealthCheck || !userSetupHealthCheck) {
    console.error(
      `Setup failed after ${environmentConfig.SETUP_RETRIES} attempts. Aborting test!`
    );
    exec.test.abort();
  } else {
    console.info(
      `Setup successful ${
        retryCount > 0
          ? 'after ' + retryCount + ' attempts'
          : 'on first attempt'
      } `
    );
  }

  if (!users) {
    console.error('Setup failed user login empty. Aborting test!');
    exec.test.abort();
  }

  return {
    users,
    browserBaseUrl,
    graphqlUrl,
    userSetupBaseUrl,
    testCall,
  } as SharedData;
}
