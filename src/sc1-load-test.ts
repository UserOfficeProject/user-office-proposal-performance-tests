import { Options } from 'k6/options';

import proposalSubmissionTest from './browser/proposalSubmission';
import userCallsTest from './browser/userCalls';
import userHomeTest from './browser/userHome';
import { callTest } from './graphql/call';
import { instrumentTest } from './graphql/instrument';
import { pageContentTest } from './graphql/pageContent';
import { proposalTest } from './graphql/proposal';
import { questionaryTest } from './graphql/questionary';
import { settingsTest } from './graphql/settings';
import { userTest } from './graphql/user';
import {
  getEnvironmentConfigurations,
  getExecutionOptions,
} from './support/configurations';
import { sc1Setup } from './support/setup';
import { sc1TearDown } from './support/teardown';
import { SharedData } from './utils/sharedType';

const executionOptions = getExecutionOptions(
  +__ENV.SC1_BROWSER_VUS,
  +__ENV.SC1_BROWSER_VUS_ITERATIONS,
  +__ENV.SC1_GRAPHQL_VUS,
  +__ENV.SC1_GRAPHQL_ITERATIONS,
  __ENV.SC1_BROWSER_REQ_FAIL_THRESHOLD,
  __ENV.SC1_HTTP_REQ_FAIL_THRESHOLD,
  __ENV.SC1_PROPOSALS_SUBMITTED_FAIL_THRESHOLD,
  __ENV.SC1_CHECK_FAIL_THRESHOLD
);
const environmentConfig = getEnvironmentConfigurations();
export async function setup() {
  return await sc1Setup(environmentConfig);
}

//This set the execution options
export const options: Options = { ...executionOptions };

export async function graphqlTest(sharedData: SharedData) {
  callTest(sharedData);
  userTest(sharedData);
  questionaryTest(sharedData);
  settingsTest(sharedData);
  pageContentTest(sharedData);
  instrumentTest(sharedData);
  proposalTest(sharedData);
}
export function browserProposalSubmissionTest(sharedData: SharedData) {
  proposalSubmissionTest(sharedData);
}
export function browserUserHomeTest(sharedData: SharedData) {
  userHomeTest(sharedData);
}
export function browserUserCallsTest(sharedData: SharedData) {
  userCallsTest(sharedData);
}

export function teardown(sharedData: SharedData) {
  return sc1TearDown(sharedData, environmentConfig);
}
