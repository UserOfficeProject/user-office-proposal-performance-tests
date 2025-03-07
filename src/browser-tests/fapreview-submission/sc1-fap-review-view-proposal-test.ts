import { Options } from 'k6/options';

import { getEnvironmentConfigurations } from '../../support/configurations';
import { SharedData } from '../../utils/sharedType';
import { sc1TearDownFapReview } from '../../support/teardownFapReview';
import fapReviewViewProposalTest from '../support/fapReviewViewProposal';
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
    view_proposal_response_time: [`p(90) < 200`],
    checks: ['rate>0.90'],
  },
  scenarios: {
    fapReviewViewProposal: {
      exec: 'fapReviewViewProposal',
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
  return await sc1SetupFapReview(environmentConfig);
}
export function fapReviewViewProposal(sharedData: SharedData) {
  fapReviewViewProposalTest(sharedData);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDownFapReview(sharedData, environmentConfig);
}
