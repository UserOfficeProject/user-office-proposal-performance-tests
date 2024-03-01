import { check, sleep } from 'k6';

import { getNoTokenApi } from '../support/graphql';
import { SharedData } from '../utils/sharedType';

export function tokenLogin(sharedData: SharedData) {
  const apiClient = getNoTokenApi(sharedData.graphqlUrl);
  const externalTokenLogin = `
    mutation ExternalTokenLogin{
      externalTokenLogin(redirectUri: " ", externalToken: "${sharedData.users[49 + __VU].sessionId}")
     }`;

  const responseExternalToken = apiClient(
    JSON.stringify({ query: externalTokenLogin })
  );
  check(responseExternalToken, {
    'External token login successfully': (r) => {
      return r.status === 200;
    },
  });
  sleep(10);
}
