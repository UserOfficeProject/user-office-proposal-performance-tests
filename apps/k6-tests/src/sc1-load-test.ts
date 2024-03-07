import { Options } from 'k6/options';

import { proposalTest } from './browser/proposal';
import { tokenLogin } from './graphql/user';
import {
  getEnvironmentConfigurations,
  getExecutionOptions,
} from './support/configurations';
import { sc1Setup } from './support/setup';
import { sc1TearDown } from './support/teardown';
import { SharedData } from './utils/sharedType';

const executionOptions = getExecutionOptions(
  +__ENV.SC1_BROWSER_VUS,
  +__ENV.SC1_BROWSER_ITERATIONS,
  __ENV.SC1_BROWSER_REQ_FAIL_THRESHOLD,
  +__ENV.SC1_GRAPHQL_VUS,
  +__ENV.SC1_GRAPHQL_ITERATIONS
);
const environmentConfig = getEnvironmentConfigurations();

export function setup() {
  return sc1Setup(environmentConfig);
}

//This set the execution options
export const options: Options = { ...executionOptions };

export async function graphqlTests(SharedData: SharedData) {
  return tokenLogin(SharedData);
}

export async function browserTests(sc1SharedData: SharedData) {
  return proposalTest(sc1SharedData);
}

export function teardown(SharedData: SharedData) {
  return sc1TearDown(SharedData, environmentConfig);
}
