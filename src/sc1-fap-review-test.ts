import { Options } from 'k6/options';

import proposalFapReviewTest from './browser/fapReview';
import { getEnvironmentConfigurations } from './support/configurations';
import { sc1Setup } from './support/setup';
import { sc1TearDown } from './support/teardown';
import { SharedData } from './utils/sharedType';

export const options: Options = {
  // thresholds: {
  //   browser_http_req_failed: [
  //     {
  //       threshold: 'rate <= 0.95',
  //       abortOnFail: true,
  //     },
  //   ],
  //   http_req_failed: [
  //     {
  //       threshold: 'rate <= 0.95',
  //       abortOnFail: true,
  //     },
  //   ],
  //   checks: ['rate>0.90'],
  // },
  scenarios: {
    proposalFapReview: {
      exec: 'proposalFapReview',
      executor: 'per-vu-iterations',
      vus: +__ENV.K6_PS_VUS || 5,
      iterations: +__ENV.K6_PS_ITERATIONS || 2,
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
export function proposalFapReview(sharedData: SharedData) {
  proposalFapReviewTest(sharedData);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDown(sharedData, environmentConfig);
}
