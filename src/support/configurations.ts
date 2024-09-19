export type EnvironmentConfigurations = {
  GRAPHQL_TOKEN: string;
  USER_DB_USERNAME: string;
  USER_DB_PASSWORD: string;
  USER_DB_CONNECTION_STRING: string;
  SETUP_RETRIES: number;
  SETUP_RETRY_INTERVAL: number;
  SETUP_TOTAL_USERS: number;
  USER_STARTING_ID: number;
  SETUP_TEST_USERS: string;
  SETUP_TEST_CALL: string;
};

export function getEnvironmentConfigurations(): EnvironmentConfigurations {
  const configDir = __ENV.PWD;
  const defaultEnv: EnvironmentConfigurations = {
    SETUP_RETRIES: +__ENV.SETUP_RETRIES || 5,
    SETUP_RETRY_INTERVAL: +__ENV.SETUP_RETRY_INTERVAL || 1000,
    SETUP_TOTAL_USERS: +__ENV.SETUP_TOTAL_USERS || 200,
    GRAPHQL_TOKEN: __ENV.GRAPHQL_TOKEN || '',
    USER_DB_USERNAME: __ENV.SER_DB_USERNAME || '',
    USER_DB_PASSWORD: __ENV.USER_DB_PASSWORD || '',
    USER_DB_CONNECTION_STRING: __ENV.USER_DB_CONNECTION_STRING || '',
    USER_STARTING_ID: +__ENV.USER_STARTING_ID || -260800000,
    SETUP_TEST_USERS: __ENV.SETUP_TEST_USERS || 'false',
    SETUP_TEST_CALL: __ENV.SETUP_TEST_CALL || 'false',
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
