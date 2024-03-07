import http from 'k6/http';

export function getTokenApi(graphqlUrl: string, bearerToken: string) {
  return function (body: string) {
    return http.post(graphqlUrl, body, {
      headers: {
        Authorization: `${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });
  };
}

export function getNoTokenApi(graphqlUrl: string) {
  return function (body: string) {
    return http.post(graphqlUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}
