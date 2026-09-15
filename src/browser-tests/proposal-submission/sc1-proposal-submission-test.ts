import { Options } from 'k6/options';
import { getEnvironmentConfigurations } from '../../support/configurations';
import { sc1Setup } from '../../support/setup';
import proposalSubmissionTest from '../support/proposalSubmission';
import { SharedData } from '../../utils/sharedType';
import { sc1TearDown } from '../../support/teardown';

const MIN_SUCCESS_RATE = 0.9;
const vus = +__ENV.K6_PS_VUS || 5;
const iterations = +__ENV.K6_PS_ITERATIONS || 2;
const parallelism = +__ENV.K6_TEST_PARALLELISM || 1;
const minProposalsSuccessCount = Math.max(
  1,
  Math.floor(((vus * iterations) / parallelism) * MIN_SUCCESS_RATE)
);

export const options: Options = {
  thresholds: {
    browser_http_req_failed: [
      {
        threshold: 'rate < 0.05',
        abortOnFail: true,
        delayAbortEval: '2m',
      },
    ],
    http_req_failed: [
      {
        threshold: 'rate < 0.05',
        abortOnFail: true,
        delayAbortEval: '2m',
      },
    ],
    checks: ['rate>0.90'],
    proposals_submitted: [`count >= ${minProposalsSuccessCount}`],
    proposals_created: [`count >= ${minProposalsSuccessCount}`],
    proposal_submission_success: [`rate >= ${MIN_SUCCESS_RATE}`],
  },
  scenarios: {
    proposalSubmission: {
      exec: 'proposalSubmission',
      executor: 'per-vu-iterations',
      vus,
      iterations,
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
export async function proposalSubmission(sharedData: SharedData) {
  await proposalSubmissionTest(sharedData);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDown(sharedData, environmentConfig);
}
