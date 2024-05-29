import { check } from 'k6';

import { getInitData } from '../../support/initData';
import {
  Instrument as InstrumentType,
  ClientApi,
  GenericQueryResponse,
} from '../../utils/sharedType';

export class Instrument {
  private initData = getInitData();
  constructor(private apiClient: ClientApi) {}

  createInstrument(managerUserId: number): InstrumentType {
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

    const response = this.apiClient(
      JSON.stringify({ query: mutation, variables })
    );

    return (response.json() as GenericQueryResponse)?.data
      ?.createInstrument as InstrumentType;
  }

  deleteInstrument(deleteInstrumentId: number): number {
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
    const response = this.apiClient(
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
