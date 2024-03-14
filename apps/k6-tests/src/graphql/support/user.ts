import { check, fail } from 'k6';
import exec from 'k6/execution';

import {
  ClientResponse,
  ExternalTokenLoginResponse,
} from '../../utils/sharedType';

export class User {
  constructor(private apiClient: (body: string) => ClientResponse) {}

  getUserToken(sessionId: string): string {
    const query = `
    mutation ExternalTokenLogin{
      externalTokenLogin(redirectUri: " ", externalToken: "${sessionId}")
     }`;
    const response = this.apiClient(JSON.stringify({ query }));
    if (response.status !== 200) {
      fail(`SCENARIO: ${exec.scenario.name} TEST: ProposalTest VU_ID: ${exec.vu.idInTest}
      Error response getUserToken ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`);
    }

    const responseData = response.json() as ExternalTokenLoginResponse;
    if (
      !check(response, {
        'Get user login token': (r) =>
          r.status === 200 && !!responseData.data.externalTokenLogin,
      })
    ) {
      console.error('User was not able to get login token', response.error);
    }

    return responseData.data.externalTokenLogin;
  }
}
