import { check, fail, group, sleep } from 'k6';
import exec from 'k6/execution';

import { Proposal } from './support/proposal';
import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween, randomString } from '../utils/helperFunctions';
import { GenericQueryResponse, SharedData } from '../utils/sharedType';
export function proposalTest(sharedData: SharedData) {
  if (!sharedData.users) {
    fail(`User not set`);
  }
  if (!sharedData.testCall) {
    fail(`Test call not set`);
  }
  const apiClient = getClientApi(sharedData.graphqlUrl);
  const user = new User(apiClient);

  sleep(randomIntBetween(5, 20));
  const currentUser = sharedData.users[exec.vu.idInTest];
  const userToken = user.getUserToken(`${currentUser.sessionId}`);

  const apiUserClient = getClientApi(sharedData.graphqlUrl, userToken);
  const proposal = new Proposal(apiUserClient);
  const userTestProposal = proposal.createProposal(sharedData.testCall.id);
  if (!userTestProposal) {
    fail(`SCENARIO: ${exec.scenario.name} Executing proposalTest VU_ID: ${exec.vu.idInTest}
           Failed to create user test proposal`);
  }
  group('Proposal Test', () => {
    group('Proposal query should return proposal details', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query Proposal($primaryKey: Int!) {
            proposal(primaryKey: $primaryKey) {
              title
              created
              primaryKey
              proposalId
              proposerId
            }
          }`,
          variables: {
            primaryKey: userTestProposal.primaryKey,
          },
        }),
        userToken
      );

      check(response, {
        'Proposal query status is 200': (res) => res.status === 200,
        'Proposal query returned proposal details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.proposal.primaryKey;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing proposalTest proposal query VU_ID: ${exec.vu.idInTest}
            Error response proposalTest proposal query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('ProposalById query should return proposal', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query ProposalById($proposalId: String!) {
            proposalById(proposalId: $proposalId) {
              proposalId
              primaryKey
              callId
            }
          }`,
          variables: {
            proposalId: userTestProposal.proposalId,
          },
        }),
        userToken
      );

      check(response, {
        'Proposal query status is 200': (res) => res.status === 200,
        'Proposal query returned proposal details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.proposalById.proposalId;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing proposalTest proposal query VU_ID: ${exec.vu.idInTest}
            Error response proposalTest proposal query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('ProposalStatus query should return proposal status', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query ProposalStatus($proposalStatusId: Int!) {
            proposalStatus(proposalStatusId: $proposalStatusId) {
              id
              isDefault
              name
              shortCode
            }
          }`,
          variables: {
            proposalStatusId: userTestProposal.status.id,
          },
        }),
        userToken
      );

      check(response, {
        'ProposalStatus query status is 200': (res) => res.status === 200,
        'proposalStatus query returned proposal status details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.proposalStatus.id;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing proposalTest proposalStatus query VU_ID: ${exec.vu.idInTest}
              Error response proposalTest proposalStatus query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('GenericTemplates query should return details', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query GenericTemplates($filter: GenericTemplatesFilter) {
            genericTemplates(filter: $filter) {
              id
              title
            }
          }`,
          variables: {
            filter: {
              proposalPk: userTestProposal.primaryKey,
            },
          },
        }),
        userToken
      );

      check(response, {
        'GenericTemplates query status is 200': (res) => res.status === 200,
        'GenericTemplates query returned generic templates details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.genericTemplates;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing proposalTest genericTemplates query VU_ID: ${exec.vu.idInTest}
              Error response proposalTest genericTemplates query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('Questionary query should return questionary', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
          query Questionary($questionaryId: Int!) {
            questionary(questionaryId: $questionaryId) {
              questionaryId
              templateId
              steps {
                topic {
                  templateId
                  title
                  id
                }
              }
            }
          }`,
          variables: {
            questionaryId: userTestProposal.questionary.questionaryId,
          },
        }),
        userToken
      );

      check(response, {
        'Questionary query status is 200': (res) => res.status === 200,
        'Questionary query returned questionary details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.questionary.questionaryId;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing proposalTest questionary query VU_ID: ${exec.vu.idInTest}
              Error response proposalTest questionary query ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('User should be able to update proposal', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
            mutation UpdateProposal($proposalPk: Int!, $title: String, $abstract: String, $users: [Int!]) {
                updateProposal(proposalPk: $proposalPk, title: $title, abstract: $abstract, users: $users) {
                    callId
                    statusId
                    primaryKey
                    proposalId
                }
            }`,
          variables: {
            proposalPk: userTestProposal.primaryKey,
            title: 'Updated Test' + ' ' + randomString(6),
            abstract: 'Updated Test' + ' ' + randomString(6),
            users: [],
            proposerId: currentUser.userId,
          },
        }),
        userToken
      );

      check(response, {
        'UpdateProposal mutation status is 200': (res) => res.status === 200,
        'UpdateProposal mutation returned proposal details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.updateProposal.proposalId;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing proposalTest updateProposal mutation VU_ID: ${exec.vu.idInTest}
              Error response proposalTest updateProposal mutation ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });

    group('User should be able to answer question', () => {
      const response = apiClient(
        JSON.stringify({
          query: `
            mutation AnswerTopic($questionaryId: Int!, $topicId: Int!, $answers: [AnswerInput!]!, $isPartialSave: Boolean) {
                answerTopic(questionaryId: $questionaryId, topicId: $topicId, answers: $answers, isPartialSave: $isPartialSave) {
                    topic {
                        id
                        isEnabled
                        sortOrder
                        templateId
                        title
                    }
                }
            }`,
          variables: {
            questionaryId: userTestProposal.questionary.questionaryId,
            answers: [],
            topicId: userTestProposal.questionary.steps[0].topic.id,
            isPartialSave: true,
          },
        }),
        userToken
      );

      check(response, {
        'AnswerTopic mutation status is 200': (res) => res.status === 200,
        'AnswerTopic mutation returned answerTopic details': (res) => {
          try {
            const data = res.json() as GenericQueryResponse;

            return !!data.data?.answerTopic;
          } catch (error) {
            fail(`SCENARIO: ${exec.scenario.name} Executing proposalTest answerTopic mutation VU_ID: ${exec.vu.idInTest}
                Error response proposalTest answerTopic mutation ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
          }
        },
      });
    });
  });
}
