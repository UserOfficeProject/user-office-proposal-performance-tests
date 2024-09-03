import { Options } from 'k6/options';

import userHomeTest from './browser/userHome';
import { getEnvironmentConfigurations } from './support/configurations';
import { sc1Setup } from './support/setup';
import { sc1TearDown } from './support/teardown';
import { SharedData } from './utils/sharedType';

export const options: Options = {
  thresholds: {
    browser_http_req_failed: [
      {
        threshold: 'rate <= 0.95',
        abortOnFail: true,
      },
    ],
    user_home_response_time: [`p(90) < 200`],
    checks: ['rate>0.90'],
  },
  scenarios: {
    userHome: {
      executor: 'ramping-vus',
      exec: 'userHome',
      startVUs: +__ENV.K6_UH_VUS || 5,
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
export function userHome(sharedData: SharedData) {
  userHomeTest(sharedData);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDown(sharedData, environmentConfig);
}
