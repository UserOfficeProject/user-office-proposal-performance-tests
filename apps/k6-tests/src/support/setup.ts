import { check, sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

import { EnvironmentConfigurations } from './configurations';
import { getClientApi } from './graphql';
import { UserDataSource } from './userDataSource';
import { Call } from '../graphql/support/call';
import { Template } from '../graphql/support/template';
import { SharedData } from '../utils/sharedType';

export async function sc1Setup(environmentConfig: EnvironmentConfigurations) {
  /************
      Check if the system under test and user setup server are available.
      Abort load testing if the system is not available.
      
    ************/
  let retryCount = 0;
  let proposalHealthCheck = false;
  const browserBaseUrl = __ENV.BROWSER_BASE_URL || 'http://localhost:8081';
  const graphqlUrl = __ENV.GRAPHQL_URL || 'http://localhost:8081/grapgql';

  const apiClient = getClientApi(graphqlUrl, environmentConfig.GRAPHQL_TOKEN);
  const call = new Call(apiClient);
  const template = new Template(apiClient);
  const startingId = -220800000;

  const usersDataSource = new UserDataSource(
    environmentConfig.USER_DB_USERNAME,
    environmentConfig.USER_DB_PASSWORD,
    environmentConfig.USER_DB_CONNECTION_STRING
  );
  const users = await usersDataSource.getUsersBetween(
    startingId,
    startingId + environmentConfig.SETUP_TOTAL_USERS
  );

  console.log(`Attempting setup ${environmentConfig.SETUP_RETRIES} times`);
  while (
    !proposalHealthCheck &&
    retryCount < environmentConfig.SETUP_RETRIES &&
    users.length > 0
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
        sleep(environmentConfig.SETUP_RETRY_INTERVAL); // Adjust retry delay as needed
        retryCount++;
      }
    }
  }

  // Check for final setup outcome and abort if necessary
  if (!proposalHealthCheck || users.length < 0) {
    console.error(
      `Setup failed after ${environmentConfig.SETUP_RETRIES} attempts. Aborting test!`
    );
    if (users.length < 0) {
      console.error('Failed to create users');
    }
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
  const testCall = call.createTestCall(template.createTemplate().templateId);

  return {
    users,
    browserBaseUrl,
    graphqlUrl,
    testCall,
  } as SharedData;
}
