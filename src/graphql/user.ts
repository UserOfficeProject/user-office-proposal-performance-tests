import { check, sleep, group, fail } from 'k6';
import exec from 'k6/execution';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { GenericQueryResponse, SharedData } from '../utils/sharedType';

export function userTest(sharedData: SharedData) {
  const apiClient = getClientApi(sharedData.graphqlUrl);
  const user = new User(apiClient);
  sleep(randomIntBetween(5, 20));
  const currentUser = sharedData.users[exec.vu.idInTest];
  const userToken = user.getUserToken(`${currentUser.sessionId}`);
  group('User Test', () => {
    group('Me query should return current user details', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query Me {
            me {
              id
              created
              roles {
                id
                shortCode
                title
              }
            }
          }`,
          variables: {},
        }),
        userToken
      );

      check(response, {
        'Me query status is 200': (res) => res.status === 200,
        'Me query returned current user details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.me.id;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing userTest me query VU_ID: ${exec.vu.idInTest}
          Error response userTest me query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
        'Me query returned current user roles': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return (
              data.data?.me.roles.length > 0 && !!data.data?.me.roles[0].id
            );
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing  userTest me query VU_ID: ${exec.vu.idInTest}
          Error response userTest me query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });
    group(
      'BasicUserDetailsByEmail query should return current user details',
      () => {
        const response = apiClient(
          JSON.stringify({
            query: `
          query BasicUserDetailsByEmail($email: String!) {
            basicUserDetailsByEmail(email: $email) {
              id
            }
          }`,
            variables: {
              email: currentUser.email,
            },
          }),
          userToken
        );

        check(response, {
          'BasicUserDetailsByEmail query status is 200': (res) =>
            res.status === 200,
          'BasicUserDetailsByEmail query returned current user details': (
            res
          ) => {
            try {
              const data = res.json() as GenericQueryResponse;

              return !!data.data?.basicUserDetailsByEmail.id;
            } catch (error) {
              fail(`SCENARIO: ${exec.scenario.name} Executing userTest basicUserDetailsByEmail VU_ID: ${exec.vu.idInTest}
            Error response basicUserDetailsByEmail ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
            }
          },
        });
      }
    );
  });
}
