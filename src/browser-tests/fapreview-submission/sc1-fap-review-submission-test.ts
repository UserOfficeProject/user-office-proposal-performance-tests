import { Options } from 'k6/options';

import { getEnvironmentConfigurations } from '../../support/configurations';
import { SharedData } from '../../utils/sharedType';
import fapReviewSubmissionTest from '../support/fapReviewSubmission';
import { sc1TearDownFapReview } from '../../support/teardownFapReview';
import { sc1SetupFapReview } from '../../support/setupFapReview';

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
    fapReviewSubmission: {
      exec: 'fapReviewSubmission',
      executor: 'per-vu-iterations',
      vus: +__ENV.K6_FAP_VUS || 5,
      iterations: +__ENV.K6_FAP_ITERATIONS || 2,
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
  return await sc1SetupFapReview(environmentConfig);
}
export function fapReviewSubmission(sharedData: SharedData) {
  fapReviewSubmissionTest(sharedData);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDownFapReview(sharedData, environmentConfig);
}
