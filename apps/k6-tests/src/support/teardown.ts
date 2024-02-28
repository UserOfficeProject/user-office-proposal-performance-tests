import { check } from 'k6';
import http from 'k6/http';

import { SharedData } from '../utils/sharedType';

export function sc1TearDown(sharedData: SharedData) {
  console.log('Cleaning up user set up');
  const response = http.del(`${sharedData.userSetupBaseUrl}/`, null, {});
  check(response, {
    'User setup clean up successful': (r) => r.status === 204, // Expected status code for successful deletion
  });
}
