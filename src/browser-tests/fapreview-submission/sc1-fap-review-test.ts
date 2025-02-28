import { Options } from 'k6/options';

import { getEnvironmentConfigurations } from '../../support/configurations';
import { sc1Setup } from '../../support/setup';
import { SharedData } from '../../utils/sharedType';
import fapReviewTest from '../../browser-tests/support/fapReview';
import { sc1TearDownFapReview } from '../../support/teardownFapReview';

export const options: Options = {
  setupTimeout: '240s',
  thresholds: {
    browser_http_req_failed: [
      {
        threshold: 'rate <= 0.95',
        abortOnFail: true,
      },
    ],
    http_req_failed: [
      {
        threshold: 'rate <= 0.95',
        abortOnFail: true,
      },
    ],
    checks: ['rate>0.90'],
    'checks{reviewSubmission:reviewSubmissionSaved}': ['rate>0.90'],
  },
  scenarios: {
    fapReview: {
      exec: 'fapReview',
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
export function fapReview(sharedData: SharedData) {
  fapReviewTest(sharedData);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDownFapReview(sharedData, environmentConfig);
}
