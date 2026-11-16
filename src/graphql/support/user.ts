
import {
  AsyncClientApi,
} from '../../utils/sharedType';
import { ExternalTokenLoginDocument } from '../generated/graphql';
import { executeGraphqlQuery } from '../../support/graphql';

export class User {
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async getUserToken(sessionId: string): Promise<string> {
    const externalToken = await executeGraphqlQuery(
      this.apiAsyncClient,
      ExternalTokenLoginDocument,
      {
        redirectUri: '',
        externalToken: `${sessionId}`,
      }
    ).then((data) => {
      return data.externalTokenLogin;
    });
    if (!externalToken) {
      throw new Error('Fail to get user token');
    }
    return externalToken;
  }
}
