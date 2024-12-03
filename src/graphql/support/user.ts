import { check, fail } from 'k6';
import exec from 'k6/execution';

import {
  AsyncClientApi,
  ExternalTokenLoginResponse,
} from '../../utils/sharedType';

export class User {
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async getUserToken(sessionId: string): Promise<string> {
    const query = `
    mutation ExternalTokenLogin{
      externalTokenLogin(redirectUri: " ", externalToken: "${sessionId}")
     }`;
    const response = await this.apiAsyncClient(JSON.stringify({ query }));

    check(response, {
      'GetUserToken status is 200': (res) => res.status === 200,
    });

    try {
      const responseData = response.json() as ExternalTokenLoginResponse;

      check(response, {
        'Able to get user login token': (r) =>
          r.status === 200 && !!responseData.data.externalTokenLogin,
      });

      return responseData.data.externalTokenLogin;
    } catch (error) {
      fail(`SCENARIO: ${exec.scenario.name} Executing class User.getUserToken VU_ID: ${exec.vu.idInTest}
      Error response getUserToken ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
    }
  }
}
