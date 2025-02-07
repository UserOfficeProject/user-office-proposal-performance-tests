export type Answers = Record<AnswerKey, string | number | boolean>;
export type AnswerKey =
  | 'K6_VERSION_TAG'
  | 'TEST_SETUP_VERSION_TAG'
  | 'BROWSER_BASE_URL'
  | 'TEST_SETUP_URL'
  | 'GRAPHQL_URL'
  | 'K6_PS_VUS'
  | 'K6_PS_ITERATIONS'
  | 'K6_SETUP_TOTAL_USERS'
  | 'TEST_SETUP_CALL_ID'
  | 'K6_TEST_PARALLELISM'
  | 'SETUP_TEST_USERS'
  | 'SETUP_TEST_CALL'
  | 'K6_OPENSEARCH_ADDRESS'
  | 'K6_OPENSEARCH_FLUSH_PERIOD'
  | 'K6_OPENSEARCH_FLUSH_PERIOD'
  | 'IS_CLUSTER_TEST_RUN'
  | 'INSTRUMENT_ID'
  | 'K6_TEST_FILE'
  | 'K6_TEST_NAME'
  | 'IS_BROWSER_TEST'
  | 'SETUP_K6_OPTIONS'
  | 'SETUP_OPENSEARCH_CONFIGS'
  | 'SETUP_TEST_INSTRUMENT'
  | 'K6_TEST_ID';
export const defaultAnswers: Answers = {
  K6_VERSION_TAG: '0.0.4',
  TEST_SETUP_VERSION_TAG: '0.0.4',
  BROWSER_BASE_URL: 'https://devproposal.facilities.rl.ac.uk',
  GRAPHQL_URL: 'https://devproposal.facilities.rl.ac.uk/graphql',
  TEST_SETUP_URL: 'http://test-setup:8100',
  K6_PS_VUS: 50,
  K6_PS_ITERATIONS: 2,
  K6_SETUP_TOTAL_USERS: 250,
  TEST_SETUP_CALL_ID: 54,
  K6_TEST_PARALLELISM: 2,
  SETUP_TEST_USERS: true,
  SETUP_TEST_CALL: true,
  K6_OPENSEARCH_ADDRESS:
    'https://devkubernetes.developers.facilities.rl.ac.uk/opensearch',
  K6_OPENSEARCH_FLUSH_PERIOD: '2m',
  IS_CLUSTER_TEST_RUN: true,
  INSTRUMENT_ID: '6',
  IS_BROWSER_TEST: false,
  K6_TEST_FILE: 'test.js',
  K6_TEST_NAME: 'test',
  K6_TEST_ID: 'test-id',
  SETUP_K6_OPTIONS: false,
  SETUP_OPENSEARCH_CONFIGS: false,
  SETUP_TEST_INSTRUMENT: false,
};
