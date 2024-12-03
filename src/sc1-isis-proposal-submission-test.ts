import { Options } from 'k6/options';

import isisProposalSubmissionTest from './browser/isisProposalSubmission';
import {
  getEnvironmentConfigurations,
  getFeatureFile,
} from './support/configurations';
import { sc1Setup } from './support/setup';
import { sc1TearDown } from './support/teardown';
import { readAllFile } from './utils/helperFunctions';
import { FsFile, SharedData } from './utils/sharedType';

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
    isisProposalSubmission: {
      exec: 'isisProposalSubmission',
      executor: 'per-vu-iterations',
      vus: +__ENV.K6_PS_VUS || 2,
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
let file: FsFile;
(async function () {
  file = await getFeatureFile('test.pdf');
})();
export async function setup() {
  return await sc1Setup(environmentConfig);
}
export async function isisProposalSubmission(sharedData: SharedData) {
  const fileContent = await readAllFile(file);
  await isisProposalSubmissionTest(sharedData, fileContent);
}
export async function teardown(sharedData: SharedData) {
  return await sc1TearDown(sharedData, environmentConfig);
}
