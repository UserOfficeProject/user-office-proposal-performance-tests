import { getInitData } from '../../support/initData';
import { AsyncClientApi } from '../../utils/sharedType';
import { executeGraphqlQuery } from '../../support/graphql';
import { CreateInstrumentDocument, DeleteInstrumentDocument } from '../generated/graphql';


export class Instrument {
  private initData = getInitData();
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async createInstrument(managerUserId: number) {
    const createdInstrument = await executeGraphqlQuery(
      this.apiAsyncClient,
      CreateInstrumentDocument,
      {
        ...this.initData?.instrument,
        managerUserId,
      }
    ).then((data) => {
      return data.createInstrument;
    });
    if (!createdInstrument) {
      throw new Error('Fail to create instrument');
    }
    return createdInstrument;
  }

  async deleteInstrument(deleteInstrumentId: number) {
    const deletedInstrument = await executeGraphqlQuery(
      this.apiAsyncClient,
      DeleteInstrumentDocument,
      {
        deleteInstrumentId,
      }
    ).then((data) => {
      return data.deleteInstrument;
    });
    if (!deletedInstrument) {
      throw new Error('Fail to delete instrument');
    }
    return deletedInstrument;
  }
}
