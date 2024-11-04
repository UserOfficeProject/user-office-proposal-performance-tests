import { check, fail, group, sleep } from 'k6';
import exec from 'k6/execution';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { GenericQueryResponse, SharedData } from '../utils/sharedType';
export function questionaryTest(sharedData: SharedData) {
  if (!sharedData.users) {
    fail(`User not set`);
  }
  if (!sharedData.testCall) {
    fail(`Test call not set`);
  }
  const testCall = sharedData.testCall;
  const apiClient = getClientApi(sharedData.graphqlUrl);
  const user = new User(apiClient);
  sleep(randomIntBetween(5, 20));
  const currentUser = sharedData.users[exec.vu.idInTest];
  const userToken = user.getUserToken(`${currentUser.sessionId}`);

  group('Questionary Test', () => {
    group(
      'BlankQuestionaryStepsByCallId query should return blank questionary',
      () => {
        const response = apiClient(
          JSON.stringify({
            query: `
            query getBlankQuestionaryStepsByCallId($callId: Int!) {
              blankQuestionaryStepsByCallId(callId: $callId) {
                fields {
                  answerId
                  topicId
                }
                isCompleted
              }
            }`,
            variables: {
              callId: testCall.id,
            },
          }),
          userToken
        );

        check(response, {
          'BlankQuestionaryStepsByCallId query status is 200': (res) =>
            res.status === 200,
          'BlankQuestionaryStepsByCallId query return blank questionary': (
            res
          ) => {
            try {
              const data = res.json() as GenericQueryResponse;

              return (
                data.data?.blankQuestionaryStepsByCallId.length > 0 &&
                !!data.data?.blankQuestionaryStepsByCallId[0].fields[0]
                  .topicId &&
                !data.data?.blankQuestionaryStepsByCallId[0].isCompleted
              );
            } catch (error) {
              fail(`SCENARIO: ${exec.scenario.name} Executing questionaryTest blankQuestionaryStepsByCallId query VU_ID: ${exec.vu.idInTest}
              Error response questionaryTest blankQuestionaryStepsByCallId query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
            }
          },
        });
      }
    );

    group(
      'BlankQuestionarySteps query should return questionary steps details',
      () => {
        const response = apiClient(
          JSON.stringify({
            query: `
          query BlankQuestionary($templateId: Int!) {
            blankQuestionary(templateId: $templateId) {
              isCompleted
              questionaryId
              steps {
                fields {
                  topicId
                }
              }
            }
          }`,
            variables: {
              templateId: testCall.templateId,
            },
          }),
          userToken
        );

        check(response, {
          'BlankQuestionary query status is 200': (res) => res.status === 200,
          'BlankQuestionary query return questionary steps details': (res) => {
            try {
              const data = res.json() as GenericQueryResponse;

              return (
                data.data?.blankQuestionary.steps.length > 0 &&
                !data.data?.blankQuestionary.isCompleted
              );
            } catch (error) {
              fail(`SCENARIO: ${exec.scenario.name} Executing class questionaryTest blankQuestionary query VU_ID: ${exec.vu.idInTest}
              Error response questionaryTest blankQuestionary query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
            }
          },
        });
      }
    );
  });
}
