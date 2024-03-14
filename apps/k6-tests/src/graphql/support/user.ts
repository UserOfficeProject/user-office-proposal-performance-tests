import { check } from 'k6';

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
      throw new Error(
        `Error response getUserToken ${response.status} ${response?.body} ${response?.error} ${response?.error_code}`
      );
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
