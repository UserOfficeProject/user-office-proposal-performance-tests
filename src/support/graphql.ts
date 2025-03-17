import http, { RequestBody } from 'k6/http';

import {
  AsyncClientApi,
  ClientApi,
  GenericQueryResponse,
  AsyncRequestOptions,
} from '../utils/sharedType';
import { TypedDocumentString } from '../graphql/generated/graphql';

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
    return function (
      method: string,
      body: RequestBody | null,
      options: AsyncRequestOptions | undefined
    ) {
      const optionsArgs = options ? { ...options?.params } : undefined;
      return http.asyncRequest(method, graphqlUrl, body, {
        headers: {
          Authorization:
            options && options.token
              ? generateBearerToken(options.token)
              : generateBearerToken(bearerToken),
          'Content-Type': 'application/json',
        },
        ...optionsArgs,
      });
    };
  }

  return function (
    method: string,
    body: RequestBody | null,
    options: AsyncRequestOptions | undefined
  ) {
    if (options && options.token) {
      return http.asyncRequest(method, graphqlUrl, body, {
        headers: {
          Authorization: generateBearerToken(options.token),
          'Content-Type': 'application/json',
        },
        ...options.params,
      });
    }
    const optionsArgs = options ? { ...options?.params } : undefined;
    return http.asyncRequest(method, graphqlUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...optionsArgs,
    });
  };
}

export async function executeGraphqlQuery<TResult, TVariables>(
  client: AsyncClientApi,
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
  options?: AsyncRequestOptions
) {
  const optionsArgs = options ? { ...options } : undefined;
  if (!optionsArgs?.token) {
    const response = await client(
      'POST',
      JSON.stringify({
        query,
        variables,
      }),
      optionsArgs
    );
    if (response.error || response.status !== 200) {
      throw new Error(
        `Error executing graphql request  status: ${response.status} ${response.error}`
      );
    }
    const result = response.json() as GenericQueryResponse;
    return result.data as TResult;
  }
  const response = await client(
    'POST',
    JSON.stringify({
      query,
      variables,
    }),
    optionsArgs 
  );
  if (response.error || response.status !== 200) {
    throw new Error(
      `Error executing graphql request  status: ${response.status} ${response.error}`
    );
  }
  return response.json() as TResult;
}
