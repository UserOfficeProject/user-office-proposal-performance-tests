import { check } from 'k6';

import { getInitData } from '../../support/initData';
import {
  Instrument as InstrumentType,
  GenericQueryResponse,
  AsyncClientApi,
} from '../../utils/sharedType';

export class Instrument {
  private initData = getInitData();
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async createInstrument(managerUserId: number): Promise<InstrumentType> {
    const mutation = `
    mutation CreateInstrument($name: String!, $shortCode: String!, $description: String!, $managerUserId: Int!) {
        createInstrument(name: $name, shortCode: $shortCode, description: $description, managerUserId: $managerUserId) {
          id
          description
          managerUserId
          name
          shortCode
        }
      }`;
    const variables = {
      ...this.initData?.instrument,
      managerUserId,
    };

    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );

    return (response.json() as GenericQueryResponse)?.data
      ?.createInstrument as InstrumentType;
  }

  async deleteInstrument(deleteInstrumentId: number): Promise<number> {
    const mutation = `
            mutation DeleteInstrument($deleteInstrumentId: Int!) {
                deleteInstrument(id: $deleteInstrumentId) {
                    id
                    description
                }
            }`;

    const variables = {
      deleteInstrumentId,
    };
    const response = await this.apiAsyncClient(
      JSON.stringify({ query: mutation, variables })
    );

    const responseData = response.json() as GenericQueryResponse;

    if (
      !check(response, {
        'Instrument deleted': (r) =>
          r.status === 200 && !!responseData.data.deleteInstrument.id,
      })
    ) {
      console.error('Fail to delete Instrument', response.error);
    }

    return responseData.data?.deleteInstrument.id;
  }
}
