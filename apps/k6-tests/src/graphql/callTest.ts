import { check, sleep } from 'k6';

import { Call } from './support/call';
import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';

export function call(sharedData: SharedData) {
  const clientApi = getClientApi(sharedData.graphqlUrl);
  const user = new User(clientApi);
  const call = new Call(clientApi);
  sleep(randomIntBetween(10, 100));
  const externalTokenLogin = user.getUserToken(
    `${sharedData.users[randomIntBetween(Math.floor(sharedData.users.length / 2), __VU)].sessionId}`
  );

  const calls = call.getUserCalls(externalTokenLogin, {
    isActive: true,
    isEnded: false,
  });

  check(calls, {
    'Get user calls': () => {
      return calls.length > 0;
    },
  });
}
