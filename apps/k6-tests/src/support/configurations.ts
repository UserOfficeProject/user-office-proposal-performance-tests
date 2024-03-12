import { Options } from 'k6/options';

import {
  getLocalOption,
  getDevelopOption,
  getProductionOption,
} from './options';

export type EnvironmentConfigurations = {
  GRAPHQL_TOKEN: string;
  SETUP_RETRIES: number;
  SETUP_RETRY_INTERVAL: number;
  SETUP_TOTAL_USERS: number;
};

function getConfigDirectory(): string {
  const dirs = ['apps', 'k6-tests'];
  const currentDirs = __ENV.PWD.split('/');
  const rootDir = currentDirs.filter((x) => !dirs.includes(x));

  return `${rootDir.join('/')}/${dirs.join('/')}`;
}

export function getExecutionOptions(
  browserVus?: number,
  browserIterations?: number,
  browserReqFailThreshold?: string,
  httpReqFailThreshold?: string,
  graphqlVus?: number,
  graphqlIterations?: number
): Options {
  if (`${__ENV.ENVIRONMENT}`.toLowerCase() === 'develop') {
    return getDevelopOption(
      browserVus,
      browserIterations,
      browserReqFailThreshold,
      httpReqFailThreshold,
      graphqlVus,
      graphqlIterations
    );
  }

  if (`${__ENV.ENVIRONMENT}`.toLowerCase() === 'production') {
    return getProductionOption(
      browserVus,
      browserIterations,
      browserReqFailThreshold,
      httpReqFailThreshold,
      graphqlVus,
      graphqlIterations
    );
  }

  return getLocalOption(
    browserVus,
    browserIterations,
    browserReqFailThreshold,
    httpReqFailThreshold,
    graphqlVus,
    graphqlIterations
  );
}

export function getEnvironmentConfigurations(): EnvironmentConfigurations {
  const configDir = getConfigDirectory();
  const defaultEnv: EnvironmentConfigurations = {
    SETUP_RETRIES: +__ENV.SETUP_RETRIES || 5,
    SETUP_RETRY_INTERVAL: +__ENV.SETUP_RETRY_INTERVAL || 1000,
    SETUP_TOTAL_USERS: +__ENV.SETUP_TOTAL_USERS || 200,
    GRAPHQL_TOKEN: __ENV.GRAPHQL_TOKEN || '',
  };

  try {
    const environmentConfig = JSON.parse(open(`${configDir}/.k6rc`)) ?? {};
    const localEnvs: EnvironmentConfigurations = {
      ...defaultEnv,
      ...environmentConfig,
    };

    return {
      ...localEnvs,
    };
  } catch (err) {
    if (
      __ENV.ENVIRONMENT.toLowerCase() !== 'develop' &&
      __ENV.ENVIRONMENT.toLowerCase() !== 'production'
    ) {
      console.error(
        `File .k6rc not found.Create the file in ${configDir} if you want to use it`
      );
    }

    return {
      ...defaultEnv,
    };
  }
}
