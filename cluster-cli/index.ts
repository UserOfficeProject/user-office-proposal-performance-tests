import chalk from 'chalk';
import { getQuestions } from './src/questions';
import { processQuestions } from './src/support';
import { deleteDeployment, deleteTestRunObjects } from './src/deployments';
import { deleteConfigMap } from './src/configmap';
import * as k8s from '@kubernetes/client-node';

const namespace = 'apps';
const group = 'k6.io';
const version = 'v1alpha1';
const plural = 'testruns';
const testSetupLabel = 'app=test-setup';
const testSetupDeployment = 'test-setup-deployment';

const main = async () => {
  try {
    await deleteDeployment(testSetupDeployment, namespace, testSetupLabel);

    const questions = await getQuestions();
    const answers = await processQuestions(questions);
    //Remove previous deployments
    await deleteDeployment(testSetupDeployment, namespace, testSetupLabel);
    await deleteTestRunObjects(
      `${String(answers.K6_TEST_NAME)}-deployment`,
      namespace,
      group,
      version,
      plural
    );
    //Remove configs
    await deleteConfigMap('test-scripts', namespace);
    await deleteConfigMap('test-fixtures', namespace);
    //runClusterTest(answers);
  } catch (error) {
    console.log(chalk.red(`Error executing cli ${error}`));
    process.exit();
  }
};
//run cli
main();
