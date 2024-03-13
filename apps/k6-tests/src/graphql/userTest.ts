import { check, sleep } from 'k6';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';

export function tokenLogin(sharedData: SharedData) {
  const user = new User(getClientApi(sharedData.graphqlUrl));
  const externalTokenLogin = user.getUserToken(
    `${sharedData.users[randomIntBetween(51, __VU)].sessionId}`
  );

  check(externalTokenLogin, {
    'External token login successfully': () => {
      return !!externalTokenLogin;
    },
  });
  sleep(10);
}
