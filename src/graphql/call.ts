import { check, fail, group, sleep } from 'k6';
import exec from 'k6/execution';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { GenericQueryResponse, SharedData } from '../utils/sharedType';
export function callTests(sharedData: SharedData) {
  const apiClient = getClientApi(sharedData.graphqlUrl);
  const user = new User(apiClient);
  sleep(randomIntBetween(5, 20));
  const currentUser =
    sharedData.users[Math.floor(Math.random() * (sharedData.users.length - 1))];
  const userToken = user.getUserToken(`${currentUser.sessionId}`);
  group('Call Tests', () => {
    group('Calls query should return active calls', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query Calls($filter: CallsFilter) {
            calls(filter: $filter) {
              id
              title
              shortCode
            }
          }`,
          variables: {
            filter: {
              isActive: true,
              isEnded: false,
            },
          },
        }),
        userToken
      );

      check(response, {
        'Calls query status is 200': (res) => res.status === 200,
        'Calls query returned active calls': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return data.data?.calls.length > 0 && !!data.data?.calls[0].id;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing callTests calls query VU_ID: ${exec.vu.idInTest}
          Error response callTests calls query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('Call query should return call details', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query Call($callId: Int!) {
            call(callId: $callId) {
              id
              title
              shortCode
            }
          }`,
          variables: {
            callId: sharedData.testCall.id,
          },
        }),
        userToken
      );

      check(response, {
        'Call query status is 200': (res) => res.status === 200,
        'Call query return call details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.call.id;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing callTests call query VU_ID: ${exec.vu.idInTest}
          Error response callTests call query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('Template query should return template details', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query Template($templateId: Int!) {
            template(templateId: $templateId) {
              templateId
              description
              name
            }
          }`,
          variables: {
            templateId: sharedData.testCall.templateId,
          },
        }),
        userToken
      );

      check(response, {
        'Template query status is 200': (res) => res.status === 200,
        'Template query return template details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.template.templateId;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing callTests template query VU_ID: ${exec.vu.idInTest}
          Error response callTests template query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });
  });
}
