import { Options } from 'k6/options';

import proposalSubmissionTest from './browser/proposalSubmission';
import { getEnvironmentConfigurations } from './support/configurations';
import { sc1Setup } from './support/setup';
import { sc1TearDown } from './support/teardown';
import { generateTextSummary, SummaryData } from './utils/customSummary';
import { SharedData } from './utils/sharedType';

export const options: Options = {
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
  },
  scenarios: {
    proposalSubmission: {
      exec: 'proposalSubmission',
      executor: 'per-vu-iterations',
      vus: +__ENV.K6_PS_VUS || 10,
      iterations: +__ENV.K6_PS_ITERATIONS || 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

const environmentConfig = getEnvironmentConfigurations();
export function handleSummary(data: SummaryData) {
  return {
    stdout: generateTextSummary(data),
  };
}
export async function setup() {
  return await sc1Setup(environmentConfig);
}
export function proposalSubmission(sharedData: SharedData) {
  proposalSubmissionTest(sharedData);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDown(sharedData, environmentConfig);
}
