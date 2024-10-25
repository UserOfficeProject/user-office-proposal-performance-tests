import { check, fail, group, sleep } from 'k6';
import exec from 'k6/execution';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { GenericQueryResponse, SharedData } from '../utils/sharedType';
export function instrumentTest(sharedData: SharedData) {
  if (!sharedData.users) {
    fail(`User not set`);
  }
  if (!sharedData.testCall) {
    fail(`Test call not set`);
  }
  const apiClient = getClientApi(sharedData.graphqlUrl);

  const user = new User(apiClient);

  sleep(randomIntBetween(5, 20));
  const currentUser = sharedData.users[exec.vu.iterationInScenario];
  const userToken = user.getUserToken(`${currentUser.sessionId}`);

  if (sharedData.testCall.instruments.length <= 0) {
    fail(`SCENARIO: ${exec.scenario.name} Executing instrumentTest VU_ID: ${exec.vu.idInTest}
           Test call has no assigned instruments`);
  }
  const testCallInstruments = sharedData.testCall.instruments;

  group('instrumentTest', () => {
    group('Instrument query should return instrument details', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query Instrument($instrumentId: Int!) {
            instrument(instrumentId: $instrumentId) {
              id
              name
              managerUserId
              shortCode
            }
          }`,
          variables: {
            instrumentId: testCallInstruments[0].id,
          },
        }),
        userToken
      );

      check(response, {
        'Instrument query status is 200': (res) => res.status === 200,
        'Instrument query returned instrument details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.instrument.id;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing instrumentTest instrument query VU_ID: ${exec.vu.idInTest}
            Error response instrumentTest instrument query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });
  });
}
