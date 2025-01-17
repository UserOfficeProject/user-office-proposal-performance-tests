import { fail, sleep } from 'k6';
import exec from 'k6/execution';
import { User } from './support/user';
import { executeGraphqlQuery, getAsyncClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { GetCallDocument } from './generated/graphql';
import { SharedData } from '../utils/sharedType';



export async function callTestOne(sharedData: SharedData) {
  if (!sharedData.users) {
    fail(`User not set`);
  }
  if (!sharedData.testCall) {
    fail(`Test call not set`);
  }
  const testCall = sharedData.testCall;
  const apiAsyncClient = getAsyncClientApi(sharedData.graphqlUrl);
  const user = new User(apiAsyncClient);
  sleep(randomIntBetween(5, 20));
  const currentUser = sharedData.users[exec.vu.iterationInScenario];
  const userToken = await user.getUserToken(`${currentUser.sessionId}`);

  executeGraphqlQuery(apiAsyncClient,GetCallDocument,{
    callId:testCall.id
  },userToken).then(data => {
    console.log(data.call?.id)
  })
  // group('Call Test', () => {
  //   group('Calls query should return active calls', async () => {
  //     const response = await apiAsyncClient(
  //       JSON.stringify({
  //         query: `
  //         query getCall($callId: Int!) {
  //           call(callId: $callId) {
  // id
  //   shortCode
  //   startCall
  //   endCall
  //   endCallInternal
  //   startReview
  //   endReview
  //   startFapReview
  //   endFapReview
  //   startNotify
  //   endNotify
  //   startCycle
  //   endCycle
  //   cycleComment
  //   surveyComment
  //   referenceNumberFormat
  //   proposalWorkflowId
  //   templateId
  //   esiTemplateId
  //   pdfTemplateId
  //   fapReviewTemplateId
  //   allocationTimeUnit
  //   instruments {
  //     id
  //     name
  //     shortCode
  //     description
  //     availabilityTime
  //     submitted
  //     fapId
  //     fap {
  //       id
  //       code
  //     }
  //     scientists {
  //         id
  //   firstname
  //   lastname
  //   preferredname
  //   institution
  //   institutionId
  //   position
  //   created
  //   placeholder
  //   email
  //   country
  //     }
  //     instrumentContact {
  //         id
  //   firstname
  //   lastname
  //   preferredname
  //   institution
  //   institutionId
  //   position
  //   created
  //   placeholder
  //   email
  //   country
  //     }
  //     managerUserId
  //   }
  //   faps {
  //     id
  //     code
  //   }
  //   proposalWorkflow {
  //     id
  //     name
  //     description
  //   }
  //   template {
  //     templateId
  //     name
  //     isArchived
  //   }
  //   proposalCount
  //   title
  //   description
  //   submissionMessage
  //   isActive
  //   isActiveInternal
  //             }
  //           }
  // `,
  //         variables: {
  //           callId:testCall.id
  //         },
  //       }),
  //       userToken
  //     );

  //     check(response, {
  //       'Calls query status is 200': (res) => res.status === 200,
  //       'Calls query returned active calls': (res) => {
  //         try {
  //           const data = res.json() as GenericQueryResponse;

  //           return data.data?.call
  //         } catch (error) {
  //           fail(`SCENARIO: ${exec.scenario.name} Executing callTest calls query VU_ID: ${exec.vu.idInTest}
  //         Error response callTest calls query ${response.status} ${response?.body} ${response?.error} ${response?.error_code} ${error}`);
  //         }
  //       },
  //     });
  //   });
  // });
}

