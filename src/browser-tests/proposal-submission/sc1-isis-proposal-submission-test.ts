import { Options } from 'k6/options';
import { getEnvironmentConfigurations, getFixturesFile } from '../../support/configurations';
import { FsFile, SharedData } from '../../utils/sharedType';
import { sc1Setup } from '../../support/setup';
import { readAllFile } from '../../utils/helperFunctions';
import isisProposalSubmissionTest from '../support/isisProposalSubmission';
import { sc1TearDown } from '../../support/teardown';


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
    checks: ['rate>0.98'],
    'checks{proposalBasicDetails:proposalBasicDetailsSaved}': ['rate>0.90'],
    'checks{proposalResearchDetails:proposalResearchDetailsSaved}': ['rate>0.90'],
    'checks{proposalPublicationDetails:proposalPublicationDetailsSaved}': ['rate>0.90'],
    'checks{proposalExperimentDetails:proposalExperimentDetailsSaved}': ['rate>0.90'],
    'checks{proposalSamplesDetails:proposalSamplesDetailsSaved}': ['rate>0.90'],
    'checks{proposalHazardsDetails:proposalHazardsDetailsSaved}': ['rate>0.90'],
    'checks{proposalOtherFacilitiesDetails:proposalOtherFacilitiesDetailsSaved}': ['rate>0.90'],
    'checks{proposalScienceCaseDetails:proposalScienceCaseDetailsSaved}': ['rate>0.90'],
    'checks{proposalFinalDetails:proposalFinalDetailsSaved}': ['rate>0.90'],
    'checks{proposalSubmitted:proposalSubmitted}': ['rate>0.90'],
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
  file = await getFixturesFile('test.pdf');
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
