import { confirm } from '@inquirer/prompts';
import { processQuestions } from './src/support';
import {
  createDeployment,
  createNamedJobs,
  deleteDeployment,
  deletePods,
  deleteTestRunObjects,
  getTestsPodsRunning,
} from './src/deployments';
import ora from 'ora';
import { Answers, defaultAnswers } from './src/initValues';
import { getQuestions } from './src/questions';
import { createConfigMapFromFile, deleteConfigMap } from './src/configmap';

const spinner = ora();

const config = {
  namespace: 'apps',
  k8s: {
    group: 'k6.io',
    version: 'v1alpha1',
    plural: 'testruns',
  },
  labels: {
    testSetup: 'test-setup',
    k6: 'k6',
    runner: 'true',
  },
  names: {
    testSetupDeployment: 'test-setup-deployment',
    testConfigMap: 'test-scripts',
    fixturesConfigMap: 'test-fixtures',
  },
  paths: {
    testSetupYaml: `./kubernetes/test-setup/deployment.yaml`,
    testsYaml: `./resources/basic-test.yaml`,
  },
  timeouts: {
    testCompletion: 1 * 60 * 60 * 1000, // 1 hours
    checkInterval: 30 * 1000, // 1 minute
  },
};

async function testCleanUp(answers: Answers) {
  spinner.start('Cleaning up previous test deployments and resources...');
  try {
    await deleteDeployment(
      config.names.testSetupDeployment,
      config.namespace,
      `app=${config.labels.testSetup}`
    );
    await deletePods(config.namespace, [config.labels.k6]);
    await deleteTestRunObjects(
      `${answers.K6_TEST_NAME}-deployment`,
      config.namespace,
      config.k8s.group,
      config.k8s.version,
      config.k8s.plural
    );
    //Remove configs
    await deleteConfigMap(config.names.testConfigMap, config.namespace);
    await deleteConfigMap(config.names.fixturesConfigMap, config.namespace);
    spinner.succeed('Cleanup complete.');
  } catch (error) {
    spinner.fail(`Cleanup failed: ${error}`);
    throw error;
  }
}

async function setUpTest(answers: Answers) {
  spinner.start(`Setting up test ${answers.K6_TEST_ID}`);
  try {
    await createConfigMapFromFile(
      `${answers.K6_TEST_FILE}`,
      { name: config.names.testConfigMap, namespace: config.namespace },
      'v1',
      'ConfigMap',
      `./test/${answers.K6_TEST_FILE}`
    );
    await createConfigMapFromFile(
      'test.pdf', //Can be configurable
      { name: config.names.fixturesConfigMap, namespace: config.namespace },
      'v1',
      'ConfigMap',
      `./fixtures/test.pdf` //Can be configurable
    );

    await createDeployment(
      config.names.testSetupDeployment,
      `app=${config.labels.testSetup}`,
      config.namespace,
      config.paths.testSetupYaml,
      { ...defaultAnswers, ...answers }
    );

    await createNamedJobs(
      config.namespace,
      config.labels.k6,
      config.k8s.group,
      config.k8s.version,
      config.k8s.plural,
      config.paths.testsYaml,
      { ...defaultAnswers, ...answers }
    );
    spinner.succeed('Test setup complete.');
  } catch (error) {
    spinner.fail(`Test setup failed: ${error}`);
    throw error;
  }
}

async function waitForTestCompletion(answers: Answers) {
  const startTime = Date.now();

  spinner.start(`Waiting for test "${answers.K6_TEST_ID}" to finish...`);

  try {
    while (Date.now() - startTime < config.timeouts.testCompletion) {
      const failedPods = await getTestsPodsRunning(
        config.namespace,
        [{ key: 'runner', value: config.labels.runner }],
        ['Failed']
      );
      const succeededPods = await getTestsPodsRunning(
        config.namespace,
        [{ key: 'runner', value: config.labels.runner }],
        ['Succeeded']
      );

      if (failedPods + succeededPods >= +answers.K6_TEST_PARALLELISM) {
        if (failedPods > 0) {
          spinner.fail(
            `Test "${answers.K6_TEST_ID}" completed on ${answers.K6_TEST_PARALLELISM} pods (Succeeded: ${succeededPods}, Failed: ${failedPods}).`
          );
        } else {
          spinner.succeed(
            `Test "${answers.K6_TEST_ID}" completed on ${answers.K6_TEST_PARALLELISM} pods (Succeeded: ${succeededPods}, Failed: ${failedPods}).`
          );
        }
        return;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, config.timeouts.checkInterval)
      );
    }

    spinner.fail(`Test "${answers.K6_TEST_ID}" timed out.`);
    throw new Error(
      `Timeout waiting for test "${answers.K6_TEST_ID}" to complete.`
    );
  } catch (error) {
    spinner.fail(`Error during test completion check: ${error}`);
    throw error;
  }
}

async function main() {
  try {
    const runningTestsCount = await getTestsPodsRunning(
      config.namespace,
      [
        { key: 'app', value: config.labels.k6 },
        { key: 'app', value: config.labels.testSetup },
      ],
      ['Running']
    );

    if (runningTestsCount > 0) {
      const answer = await processQuestions([
        {
          type: confirm,
          key: 'STOP_CURRENT_TESTS',
          options: {
            message: `Tests are running in namespace "${config.namespace}". Do you want to stop them and continue?`,
            default: defaultAnswers.STOP_CURRENT_TESTS,
          },
        },
      ]);

      if (!answer.STOP_CURRENT_TESTS) {
        spinner.fail(`User aborted.`);
        process.exit(1);
      }
    }

    const questions = await getQuestions();
    const userAnswers = await processQuestions(questions);
    const answers = { ...defaultAnswers, ...userAnswers };

    // Cleanup tests
    await testCleanUp(answers);
    // Setup test
    await setUpTest(answers).catch(async (error) => {
      await testCleanUp(answers);
      throw error;
    });
    // Waiting for test to finish
    await waitForTestCompletion(answers).finally(async () => {
      await testCleanUp(answers);
    });
  } catch (error) {
    spinner.fail(`Error executing cli ${error}`);
    process.exit(1);
  }
}
//run cli
main();
