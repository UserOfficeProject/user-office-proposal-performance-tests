import { getInitData } from '../../support/initData';
import { AsyncClientApi } from '../../utils/sharedType';
import { executeGraphqlQuery } from '../../support/graphql';
import {
  CreateCallDocument,
  GetCallDocument,
  GetCallsDocument,
  CallsFilter,
  DeleteCallDocument,
  AssignInstrumentsToCallDocument,
  RemoveAssignedInstrumentFromCallDocument,
} from '../generated/graphql';

export class Call {
  private initData = getInitData();
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async createTestCall(templateId: number) {
    const createdCall = await executeGraphqlQuery(
      this.apiAsyncClient,
      CreateCallDocument,
      { createCallInput: { ...this.initData?.call, templateId } }
    ).then((data) => {
      return data.createCall;
    });
    if (!createdCall) {
      return null;
    }
    return createdCall;
  }
  async deleteCall(deleteCallId: number): Promise<number> {
    const deletedCall = await executeGraphqlQuery(
      this.apiAsyncClient,
      DeleteCallDocument,
      {
        deleteCallId: deleteCallId,
      }
    ).then((data) => {
      return data.deleteCall;
    });
    if (!deletedCall) {
      throw new Error('No call was deleted');
    }
    return deletedCall.id;
  }

  async getCall(callId: number) {
    const call = await executeGraphqlQuery(
      this.apiAsyncClient,
      GetCallDocument,
      {
        callId: callId,
      }
    ).then((data) => {
      return data.call;
    });

    if (!call) {
      return null;
    }
    return call;
  }

  async getUserCalls(userToken: string, callsFilter: CallsFilter) {
    const calls = await executeGraphqlQuery(
      this.apiAsyncClient,
      GetCallsDocument,
      {
        filter: callsFilter,
      },
      userToken
    ).then((data) => {
      return data.calls;
    });
    if (!calls) {
      return null;
    }
    return calls;
  }

  async assignInstrumentsToCall(callId: number, instrumentId: number) {
    const assignInstrumentsToCall = await executeGraphqlQuery(
      this.apiAsyncClient,
      AssignInstrumentsToCallDocument,
      {
        assignInstrumentsToCallInput: {
          callId,
          instrumentFapIds: [{ instrumentId }],
        },
      }
    ).then((data) => {
      return data.assignInstrumentsToCall;
    });
    if (!assignInstrumentsToCall) {
      throw new Error('Fail to assign instruments to call');
    }
    return assignInstrumentsToCall;
  }

  async removeAssignedInstrumentFromCall(callId: number, instrumentId: number) {
    const removeAssignedInstrumentFromCall = await executeGraphqlQuery(
      this.apiAsyncClient,
      RemoveAssignedInstrumentFromCallDocument,
      {
        removeAssignedInstrumentFromCallInput: {
          callId,
          instrumentId,
        },
      }
    ).then((data) => {
      return data.removeAssignedInstrumentFromCall;
    });
    if (!removeAssignedInstrumentFromCall) {
      throw new Error('Fail to assign instruments to call');
    }
    return removeAssignedInstrumentFromCall;
  }
}
