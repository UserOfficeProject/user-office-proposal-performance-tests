import { check, fail } from 'k6';
import exec from 'k6/execution';

import { getInitData } from '../../support/initData';
import {
  CallQueryResponse,
  Call as CallType,
  CallsFilter,
  ClientApi,
  CallsQueryResponse,
} from '../../utils/sharedType';

export class Call {
  private initData = getInitData();
  constructor(private apiClient: ClientApi) {}

  createTestCall(templateId: number): CallType {
    const mutation = `
    mutation CreateCall($createCallInput: CreateCallInput!) {
      createCall(createCallInput: $createCallInput) {
        id
        shortCode
        title
        templateId
      }
    }`;

    const variables = {
      createCallInput: { ...this.initData?.call, templateId },
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
      fail(
        'Performance test could not be created aborting test, Executing Call.createTestCall'
      );
    }

    return responseData?.data?.createCall as CallType;
  }

  deleteCall(deleteCallId: number): number {
    const mutation = `
          mutation DeleteCall($deleteCallId: Int!) {
            deleteCall(id: $deleteCallId) {
              id
              shortCode
              title
              templateId
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
              templateId
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

    return responseData.data?.call;
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

    check(response, {
      'GetUserCalls status is 200': (res) => res.status === 200,
    });

    try {
      const responseData = response.json() as CallsQueryResponse;
      check(response, {
        'Get user calls has data': () => responseData?.data?.calls?.length > 0,
      });

      return responseData?.data?.calls;
    } catch (error) {
      fail(`SCENARIO: ${exec.scenario.name} Executing class Call.getUserCalls VU_ID: ${exec.vu.idInTest}
      Error response getUserCalls ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
    }
  }
}
