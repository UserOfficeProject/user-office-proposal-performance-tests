import { check, sleep } from 'k6';
import http from 'k6/http';

import { SharedData } from '../utils/sharedType';
const headers = {
  Authorization: '',
  'Content-Type': 'application/json',
};
export function tokenLogin(sharedData: SharedData) {
  const mutation = `
    mutation ExternalTokenLogin{
      externalTokenLogin(redirectUri: " ", externalToken: "${sharedData.users[49 + __VU].sessionId}")
     }`;

  const responseExternalToken = http.post(
    sharedData.graphqlUrl,
    JSON.stringify({ query: mutation }),
    {
      headers: headers,
    }
  );
  check(responseExternalToken, {
    'External token login successfully': (r) => {
      return r.status === 200;
    },
  });
  sleep(10);
}
