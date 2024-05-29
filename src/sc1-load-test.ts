import { Options } from 'k6/options';

import { proposal } from './browser/proposalTest';
import { callTests } from './graphql/call';
import { instrumentTests } from './graphql/instrument';
import { pageContentTests } from './graphql/pageContent';
import { proposalTests } from './graphql/proposal';
import { questionaryTests } from './graphql/questionary';
import { settingsTests } from './graphql/settings';
import { userTests } from './graphql/user';
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

export async function graphqlTests(sharedData: SharedData) {
  return await Promise.all([
    callTests(sharedData),
    userTests(sharedData),
    questionaryTests(sharedData),
    settingsTests(sharedData),
    pageContentTests(sharedData),
    instrumentTests(sharedData),
    proposalTests(sharedData),
  ]);
}

export async function browserTests(sharedData: SharedData) {
  return proposal(sharedData);
}

export function teardown(sharedData: SharedData) {
  return sc1TearDown(sharedData, environmentConfig);
}
