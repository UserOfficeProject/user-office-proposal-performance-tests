import { Options } from 'k6/options';
import { getEnvironmentConfigurations } from '../../support/configurations';
import { sc1Setup } from '../../support/setup';
import { SharedData } from '../../utils/sharedType';

import { sc1TearDown } from '../../support/teardown';
import userCallsTest from '../support/userCalls';



export const options: Options = {
  thresholds: {
    browser_http_req_failed: [
      {
        threshold: 'rate <= 0.95',
        abortOnFail: true,
      },
    ],
    user_calls_response_time: [`p(90) < 200`],
    checks: ['rate>0.90'],
  },
  scenarios: {
    userCalls: {
      executor: 'ramping-vus',
      exec: 'userCalls',
      startVUs: +__ENV.K6_US_VUS || 5,
      stages: [
        { duration: '60s', target: 10 },
        { duration: '200s', target: 25 },
        { duration: '100s', target: 50 },
        { duration: '200s', target: 25 },
        { duration: '60s', target: 10 },
        { duration: '10s', target: 5 },
      ],
      gracefulRampDown: '0s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

const environmentConfig = getEnvironmentConfigurations();
export async function setup() {
  return await sc1Setup(environmentConfig);
}
export function userCalls(sharedData: SharedData) {
  userCallsTest(sharedData);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDown(sharedData, environmentConfig);
}
