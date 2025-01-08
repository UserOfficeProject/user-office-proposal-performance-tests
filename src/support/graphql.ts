import http from 'k6/http';

import { AsyncClientApi, ClientApi } from '../utils/sharedType';

export function generateBearerToken(token: string): string {
  if (!token.startsWith('Bearer')) {
    return `Bearer ${token}`;
  }

  return token;
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

export function getAsyncClientApi(graphqlUrl: string): AsyncClientApi;
export function getAsyncClientApi(
  graphqlUrl: string,
  bearerToken?: string
): AsyncClientApi;
export function getAsyncClientApi(
  graphqlUrl: string,
  bearerToken?: string
): AsyncClientApi {
  if (bearerToken) {
    return function (body: string, userToken?: string) {
      return http.asyncRequest('POST', graphqlUrl, body, {
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
      return http.asyncRequest('POST', graphqlUrl, body, {
        headers: {
          Authorization: generateBearerToken(userToken),
          'Content-Type': 'application/json',
        },
      });
    }

    return http.asyncRequest('POST', graphqlUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}
