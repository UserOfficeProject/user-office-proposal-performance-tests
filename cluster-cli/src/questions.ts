import { select, confirm, number, input } from '@inquirer/prompts';
import getFiles from './files';
import { format } from 'date-fns';
import { defaultAnswers } from './initValues';

export type QuestionOptions = {
  [key: string]: unknown;
};
export type Question = {
  key: string;
  type: typeof select | typeof confirm | typeof number | typeof input;
  dependencyPrompt?: string;
  dependencyAnswer?: string;
  defaultCallBack?: (value: string) => string;
  options: QuestionOptions;
};
export const getQuestions = async () => {
  const testFiles = await getFiles('./test');
  if (testFiles.length <= 0) {
    console.log('No test files found , please run script build:k6-test');
    process.exit();
  }
  return [
    {
      type: select,
      key: 'K6_TEST_FILE',
      options: {
        message: 'Select test file',
        default: 'tests.js',
        choices: [...testFiles],
      },
    },
    {
      type: input,
      key: 'K6_TEST_NAME',
      dependencyAnswer: 'K6_TEST_FILE',
      defaultCallBack: (value: string) => {
        if (!value) {
          return '';
        }
        return `${value.toString().slice(0, -3)}`;
      },
      options: {
        message: 'K6 test name',
        default: defaultAnswers.K6_TEST_FILE,
      },
    },
    {
      type: input,
      key: 'K6_TEST_ID',
      dependencyAnswer: 'K6_TEST_NAME',
      defaultCallBack: (value: string) => {
        if (!value) {
          return '';
        }
        return `${value}-${format(new Date(), 'dd/MM/y:H:mm')}`;
      },
      options: {
        message: 'K6 test id',
        default: defaultAnswers.K6_TEST_FILE,
      },
    },
    {
      type: confirm,
      key: 'IS_BROWSER_TEST',
      options: {
        message: 'Is this a browser test?',
        default: defaultAnswers.IS_BROWSER_TEST,
      },
    },
    {
      type: input,
      key: 'BROWSER_BASE_URL',
      dependencyPrompt: 'IS_BROWSER_TEST',
      options: {
        message: 'Browser base url',
        default: defaultAnswers.BROWSER_BASE_URL,
      },
    },
    {
      type: input,
      key: 'GRAPHQL_URL',
      options: {
        message: 'Graphql base url',
        default: defaultAnswers.GRAPHQL_URL,
      },
    },
    {
      type: confirm,
      key: 'SETUP_TEST_USERS',
      options: {
        message: 'Does the test require test users?',
        default: defaultAnswers.SETUP_TEST_USERS,
      },
    },
    {
      type: input,
      key: 'TEST_SETUP_VERSION_TAG',
      dependencyPrompt: 'SETUP_TEST_USERS',
      options: {
        message: 'Test set up image version tag',
        default: defaultAnswers.TEST_SETUP_VERSION_TAG,
      },
    },
    {
      type: input,
      key: 'TEST_SETUP_URL',
      dependencyPrompt: 'SETUP_TEST_USERS',
      options: {
        message: 'Test user url',
        default: defaultAnswers.TEST_SETUP_URL,
      },
    },
    {
      type: input,
      key: 'K6_SETUP_TOTAL_USERS',
      dependencyPrompt: 'SETUP_TEST_USERS',
      options: {
        message: 'Total test users required',
        default: defaultAnswers.K6_SETUP_TOTAL_USERS,
      },
    },
    {
      type: input,
      key: 'FIRST_USER_ID',
      dependencyPrompt: 'SETUP_TEST_USERS',
      options: {
        message: 'First user number',
        default: defaultAnswers.FIRST_USER_ID,
      },
    },
    {
      type: confirm,
      key: 'SETUP_K6_OPTIONS',
      options: {
        message: 'Do you want to set custom k6 options?',
        default: defaultAnswers.SETUP_K6_OPTIONS,
      },
    },
    {
      type: input,
      key: 'K6_PS_VUS',
      dependencyPrompt: 'SETUP_K6_OPTIONS',
      options: {
        message: 'Total k6 vus',
        default: defaultAnswers.K6_PS_VUS,
      },
    },
    {
      type: input,
      key: 'K6_PS_ITERATIONS',
      dependencyPrompt: 'SETUP_K6_OPTIONS',
      options: {
        message: 'K6 iterations per vus',
        default: defaultAnswers.K6_PS_ITERATIONS,
      },
    },
    {
      type: input,
      key: 'K6_TEST_PARALLELISM',
      dependencyPrompt: 'SETUP_K6_OPTIONS',
      options: {
        message: 'K6 parallel test pods',
        default: defaultAnswers.K6_TEST_PARALLELISM,
      },
    },
    {
      type: confirm,
      key: 'SETUP_OPENSEARCH_CONFIGS',
      options: {
        message: 'Do you want to set opensearch configs',
        default: defaultAnswers.SETUP_K6_OPTIONS,
      },
    },
    {
      type: input,
      key: 'K6_OPENSEARCH_ADDRESS',
      dependencyPrompt: 'SETUP_OPENSEARCH_CONFIGS',
      options: {
        message: 'Open search address',
        default: defaultAnswers.K6_OPENSEARCH_ADDRESS,
      },
    },
    {
      type: input,
      key: 'K6_OPENSEARCH_FLUSH_PERIOD',
      dependencyPrompt: 'SETUP_OPENSEARCH_CONFIGS',
      options: {
        message: 'Open search flush period',
        default: defaultAnswers.K6_OPENSEARCH_FLUSH_PERIOD,
      },
    },
    {
      type: confirm,
      key: 'SETUP_TEST_INSTRUMENT',
      options: {
        message: 'Do the job want instrument id ?',
        default: defaultAnswers.SETUP_TEST_INSTRUMENT,
      },
    },
    {
      type: input,
      key: 'INSTRUMENT_ID',
      dependencyPrompt: 'SETUP_TEST_INSTRUMENT',
      options: {
        message: 'Instrument id',
        default: defaultAnswers.INSTRUMENT_ID ,
      },
    },
    {
      type: confirm,
      key: 'SETUP_TEST_CALL',
      options: {
        message: 'Do the job require test call ?',
        default: defaultAnswers.SETUP_TEST_CALL,
      },
    },
    {
      type: input,
      key: 'TEST_SETUP_CALL_ID',
      dependencyPrompt: 'SETUP_TEST_CALL',
      options: {
        message: 'Call id',
        default: defaultAnswers.TEST_SETUP_CALL_ID,
      },
    },
  ];
};
