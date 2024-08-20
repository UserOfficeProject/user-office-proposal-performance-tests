import http from 'k6/http';

import { ClientApi } from '../utils/sharedType';

function generateBearerToken(text: string): string {
  if (!text.startsWith('Bearer')) {
    return `Bearer ${text}`;
  }

  return text;
}
export function getClientApi(graphqlUrl: string): ClientApi;
export function getClientApi(
  graphqlUrl: string,
  bearerToken?: string
): ClientApi;
export function getClientApi(
  graphqlUrl: string,
  bearerToken?: string
): ClientApi {
  if (bearerToken) {
    return function (body: string, userToken?: string) {
      return http.post(graphqlUrl, body, {
        headers: {
          Authorization: userToken
            ? generateBearerToken(userToken)
            : generateBearerToken(bearerToken),
          'Content-Type': 'application/json',
        },
      });
    };
  }

  return function (body: string, userToken?: string) {
    if (userToken) {
      return http.post(graphqlUrl, body, {
        headers: {
          Authorization: generateBearerToken(userToken),
          'Content-Type': 'application/json',
        },
      });
    }

    return http.post(graphqlUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}
