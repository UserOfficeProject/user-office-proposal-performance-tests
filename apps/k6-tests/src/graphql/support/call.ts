import { check, fail } from 'k6';

import {
  ClientResponse,
  CallQueryResponse,
  Call as CallType,
  InitData,
} from '../../utils/sharedType';

export class Call {
  constructor(
    private apiClient: (body: string) => ClientResponse,
    private initData: InitData
  ) {}

  createTestCall(): CallType {
    const mutation = `
    mutation CreateCall($createCallInput: CreateCallInput!) {
      createCall(createCallInput: $createCallInput) {
        id
        shortCode
        title
      }
    }`;

    const variables = {
      createCallInput: { ...this.initData?.call },
    };

    const response = this.apiClient(
      JSON.stringify({ query: mutation, variables })
    );
    const responseData = response.json() as CallQueryResponse;
    const checkValue = check(response, {
      'Performance test call created': (r) =>
        r.status === 200 && !!responseData.data?.createCall?.id,
    }).valueOf();

    console.log('checkValue' + checkValue);
    if (!checkValue) {
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
