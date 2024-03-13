import { check, fail } from 'k6';

import {
  CallQueryResponse,
  Call as CallType,
  InitData,
  CallsFilter,
  ClientApi,
  CallsQueryResponse,
} from '../../utils/sharedType';

export class Call {
  constructor(
    private apiClient: ClientApi,
    private initData?: InitData
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

  getUserCalls(userToken: string, callsFilter: CallsFilter): [CallType] {
    const query = `
            query Calls($filter: CallsFilter) {
              calls(filter: $filter) {
                id
                title
                shortCode
                templateId
                endCall
                endCallInternal
                allocationTimeUnit
                cycleComment
                isActive
                isActiveInternal
                shortCode
                startCall
                startCycle
                pdfTemplateId
              }
            }`;

    const variables = {
      filter: callsFilter,
    };

    const response = this.apiClient(
      JSON.stringify({ query, variables }),
      userToken
    );
    const responseData = response.json() as CallsQueryResponse;
    if (
      !check(response, {
        'Get user calls': (r) =>
          r.status === 200 && responseData?.data?.calls?.length > 0,
      })
    ) {
      console.log('No user calls found', response.error);
    }

    return responseData?.data?.calls;
  }
}
