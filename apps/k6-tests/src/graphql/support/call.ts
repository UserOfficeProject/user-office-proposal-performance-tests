import { check, fail } from 'k6';

import { AllocationTimeUnits, initData } from '../../support/initData';
import { randomString } from '../../utils/helperFunctions';
import {
  ClientResponse,
  CallQueryResponse,
  Call as CallType,
} from '../../utils/sharedType';

export class Call {
  constructor(private apiClient: (body: string) => ClientResponse) {}

  createTestCall(): CallType {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    const future = new Date();
    future.setDate(current.getDate() + 2);

    const mutation = `
    mutation CreateCall($createCallInput: CreateCallInput!) {
      createCall(createCallInput: $createCallInput) {
        id
        shortCode
        title
      }
    }`;

    const variables = {
      createCallInput: {
        title: initData.call.title + ' ' + randomString(6),
        shortCode: initData.call.shortCode + ' ' + randomString(6),
        startCall: current,
        endCall: future,
        startReview: future,
        endReview: future,
        startFapReview: future,
        endFapReview: future,
        startNotify: future,
        endNotify: future,
        startCycle: future,
        endCycle: future,
        templateId: 1,
        allocationTimeUnit: AllocationTimeUnits.DAY,
        cycleComment: `${randomString(20)}`,
        surveyComment: `${randomString(10)}`,
        proposalWorkflowId: 1,
      },
    };

    const response = this.apiClient(
      JSON.stringify({ query: mutation, variables })
    );
    const responseData = response.json() as CallQueryResponse;

    if (
      !check(response, {
        'Performance test call created': (r) =>
          r.status === 200 && !!responseData.data.createCall.id && true,
      })
    ) {
      fail('Performance test could not be created aborting test');
    }

    return responseData.data.createCall as CallType;
  }

  deleteCall(deleteCallId: number): number {
    const mutation = `
          mutation DeleteCall($deleteCallId: Int!) {
            deleteCall(id: $deleteCallId) {
              id
              shortCode
              title
            }
          }`;

    const variables = {
      deleteCallId: deleteCallId,
    };

    const response = this.apiClient(
      JSON.stringify({ query: mutation, variables })
    );

    const responseData = response.json() as CallQueryResponse;

    if (
      !check(response, {
        'Call deleted': (r) =>
          r.status === 200 && !!responseData.data.deleteCall.id && true,
      })
    ) {
      console.log('Fail to delete call', response.error);
    }

    return deleteCallId;
  }

  getCall(callId: number): CallType {
    const query = `
          query getCall($callId: Int!) {
            call(callId: $callId) {
              id
              title
              shortCode
            }
          }`;

    const variables = {
      callId: callId,
    };

    const response = this.apiClient(JSON.stringify({ query, variables }));
    const responseData = response.json() as CallQueryResponse;

    if (
      !check(response, {
        'Get call': (r) =>
          r.status === 200 && !!responseData.data.call.id && true,
      })
    ) {
      console.log('Call was not found', response.error);
    }

    return responseData.data.call;
  }
}
