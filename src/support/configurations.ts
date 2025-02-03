import { open as fsOpen } from 'k6/experimental/fs';

export type EnvironmentConfigurations = {
  GRAPHQL_TOKEN: string;
  SETUP_RETRIES: number;
  SETUP_RETRY_INTERVAL: number;
  SETUP_TOTAL_USERS: number;
  USER_STARTING_ID: number;
  SETUP_TEST_USERS: string;
  SETUP_TEST_REVIEWERS: string;
  SETUP_TEST_REVIEWER_ROLE: string;
  SETUP_TEST_CALL: string;
  IS_CLUSTER_TEST_RUN: string;
  INSTRUMENT_ID: number;
  BROWSER_BASE_URL: string;
  GRAPHQL_URL: string;
  TEST_SETUP_URL: string;
};

export function getEnvironmentConfigurations(): EnvironmentConfigurations {

    return {
      BROWSER_BASE_URL: __ENV.BROWSER_BASE_URL || 'http://localhost:8081',
      GRAPHQL_URL: __ENV.GRAPHQL_URL || 'http://localhost:8081/grapgql',
      TEST_SETUP_URL: __ENV.TEST_SETUP_URL || 'http://localhost:8100',
      SETUP_RETRIES: +__ENV.SETUP_RETRIES || 5,
      SETUP_RETRY_INTERVAL: +__ENV.SETUP_RETRY_INTERVAL || 1000,
      SETUP_TOTAL_USERS: +__ENV.SETUP_TOTAL_USERS || 200,
      GRAPHQL_TOKEN: __ENV.GRAPHQL_TOKEN || '',
      USER_STARTING_ID: +__ENV.USER_STARTING_ID || -260800000,
      SETUP_TEST_USERS: __ENV.SETUP_TEST_USERS || 'false',
    SETUP_TEST_REVIEWERS: __ENV.SETUP_TEST_REVIEWERS || 'false',
    SETUP_TEST_REVIEWER_ROLE: __ENV.SETUP_TEST_REVIEWER_ROLE || 'false',
      SETUP_TEST_CALL: __ENV.SETUP_TEST_CALL || 'false',
      IS_CLUSTER_TEST_RUN: __ENV.IS_CLUSTER_TEST_RUN || 'false',
      INSTRUMENT_ID: +__ENV.INSTRUMENT_ID || 37,
    };
}

export async function getFixturesFile(fileName: string) {
  const configDir = __ENV.PWD;

  try {
    const configDir = __ENV.PWD;
    if (configDir == null) {
      return await fsOpen(`/fixtures/${fileName}`);
    }

    return await fsOpen(`${configDir}/fixtures/${fileName}`);
  } catch (err) {
    throw new Error(
      `File ${fileName} not found.Create the file in ${configDir}/fixtures/ if you want to use it ${err}`
    );
  }
}
