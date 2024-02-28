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
  +__ENV.SC1_GRAPHQL_VUS,
  +__ENV.SC1_GRAPHQL_ITERATIONS
);
const environmentConfig = getEnvironmentConfigurations();

export function setup() {
  return sc1Setup(environmentConfig);
}

//This set the execution options
export const options: Options = { ...executionOptions };

export async function graphqlTests(sharedData: SharedData) {
  return tokenLogin(sharedData);
}

export async function browserTests(sharedData: SharedData) {
  return proposalTest(sharedData);
}

export function teardown(sharedData: SharedData) {
  return sc1TearDown(sharedData);
}
