import { check, sleep } from 'k6';

import { User } from './support/user';
import { getClientApi } from '../support/graphql';
import { randomIntBetween } from '../utils/helperFunctions';
import { SharedData } from '../utils/sharedType';

export function tokenLogin(sharedData: SharedData) {
  const user = new User(getClientApi(sharedData.graphqlUrl));
  sleep(randomIntBetween(10, 100));
  const externalTokenLogin = user.getUserToken(
    `${sharedData.users[Math.floor(Math.random() * (sharedData.users.length - 1))].sessionId}`
  );

  check(externalTokenLogin, {
    'External token login successfully': () => {
      return !!externalTokenLogin;
    },
  });
}
