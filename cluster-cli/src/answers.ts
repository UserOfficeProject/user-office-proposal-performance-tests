
import { Answers, defaultAnswers } from './initValues';
import { input, select, confirm } from '@inquirer/prompts';
import { format } from 'date-fns';
import getFiles from './files';
export async function getUserPromptAnswer():Promise<Answers> {
  const answers: Answers = {
    ...defaultAnswers,
  };
  const testFiles = await getFiles('./test');
  if (testFiles.length <= 0) {
    console.log('No test files found , please run script build:k6-test');
    process.exit();
  }

  answers.K6_TEST_FILE = await select({
    message: 'Select test file',
    default: answers.K6_TEST_FILE,
    choices: [...testFiles],
  });
  answers.K6_VERSION_TAG = await input({
    message: 'K6 image version tag:',
    default: answers.K6_VERSION_TAG.toString(),
  });

  const isBrowserTest = await confirm({
    message: 'Is this a browser test?',
    default: false,
  });
  if (isBrowserTest) {
    answers.BROWSER_BASE_URL = await input({
      message: 'Browser base url:',
      default: answers.BROWSER_BASE_URL.toString(),
    });
  }

  answers.GRAPHQL_URL = await input({
    message: 'Graphql base url:',
    default: answers.GRAPHQL_URL.toString(),
  });

  const requireTestUsers = await confirm({
    message: 'Does the test require test users?',
    default: false,
  });

  if (requireTestUsers) {
    answers.K6_SETUP_TOTAL_USERS = 'true';

    answers.TEST_SETUP_VERSION_TAG = await input({
      message: 'Test set up image version tag:',
      default: answers.TEST_SETUP_VERSION_TAG.toString(),
    });

    answers.TEST_SETUP_URL = await input({
      message: 'Test user url:',
      default: answers.TEST_SETUP_URL.toString(),
    });
    answers.K6_SETUP_TOTAL_USERS = await input({
      message: 'Total test users:',
      default: answers.K6_SETUP_TOTAL_USERS.toString(),
    });
  } else {
    answers.K6_SETUP_TOTAL_USERS = 'false';
  }

  const requireCustomK6Options = await confirm({
    message: 'Do you want to set custom k6 options?',
    default: false,
  });
  if (requireCustomK6Options) {
    answers.K6_PS_VUS = await input({
      message: 'K6 vus:',
      default: answers.K6_PS_VUS.toString(),
    });
    answers.K6_PS_ITERATIONS = await input({
      message: 'K6 iterations per vus:',
      default: answers.K6_PS_ITERATIONS.toString(),
    });
    answers.K6_TEST_PARALLELISM = await input({
      message: 'K6 parallel test pods',
      default: answers.K6_TEST_PARALLELISM.toString(),
    });
  }
  const setOpenSearchConfigs = await confirm({
    message: 'Do you want to set opensearch configs ?',
    default: false,
  });
  if (setOpenSearchConfigs) {
    answers.K6_OPENSEARCH_ADDRESS = await input({
      message: 'Open search address',
      default: answers.K6_OPENSEARCH_ADDRESS.toString(),
    });
    answers.K6_OPENSEARCH_FLUSH_PERIOD = await input({
      message: 'Open search flush period',
      default: answers.K6_OPENSEARCH_FLUSH_PERIOD.toString(),
    });
  }
  const requireInstrumentId = await confirm({
    message: 'Do the job want instrument id ?',
    default: false,
  });
  if (requireInstrumentId) {
    answers.INSTRUMENT_ID = await input({
      message: 'Instrument id',
      default: answers.INSTRUMENT_ID.toString(),
    });
  }
  const requireTestCall = await confirm({
    message: 'Do the job require test call ?',
    default: false,
  });
  if (requireTestCall) {
    answers.SETUP_TEST_CALL = 'true';
    answers.TEST_SETUP_CALL_ID = await input({
      message: 'Call id',
      default: answers.TEST_SETUP_CALL_ID.toString(),
    });
  } else {
    answers.SETUP_TEST_CALL = 'false';
  }
  answers.K6_TEST_ID = `${answers.K6_TEST_FILE.toString().slice(0, -3)}-${format(new Date(), 'dd/MM/y:H:mm')}`;
 return answers
}
