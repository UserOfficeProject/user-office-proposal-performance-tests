import { check, fail, group, sleep } from 'k6';
import exec from 'k6/execution';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { GenericQueryResponse, SharedData } from '../utils/sharedType';
export function settingsTest(sharedData: SharedData) {
  const apiClient = getClientApi(sharedData.graphqlUrl);
  const user = new User(apiClient);
  sleep(randomIntBetween(5, 20));
  const currentUser =
    sharedData.users[Math.floor(Math.random() * (sharedData.users.length - 1))];
  const userToken = user.getUserToken(`${currentUser.sessionId}`);
  group('settings', () => {
    group('Settings query should return app settings', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query Settings {
            settings {
              description
              id
            }
          }`,
          variables: {},
        }),
        userToken
      );

      check(response, {
        'Settings query status is 200': (res) => res.status === 200,
        'Settings query returned app settings': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return (
              data.data?.settings.length > 0 &&
              !!data.data?.settings[0].description
            );
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing settingsTest settings query VU_ID: ${exec.vu.idInTest}
          Error response settingsTest settings query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });
  });
}
