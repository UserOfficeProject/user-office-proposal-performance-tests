import chalk from 'chalk';
import { getQuestions } from './src/questions';
import { processQuestions } from './src/support';
import { deleteDeployment, deleteTestRunObjects } from './src/deployments';
import { deleteConfigMap } from './src/configmap';
const testTestUpDeployment = 'test-setup-deployment';
const namespace = 'apps';
const group = 'k6.io';
const version = 'v1alpha1';
const plural = 'testruns'
const main = async () => {
  try {
    const questions = await getQuestions();
    const answers = await processQuestions(questions);
    //Remove previous deployments
    await deleteDeployment(namespace, testTestUpDeployment);
    await deleteTestRunObjects(`${String(answers.K6_TEST_NAME)}-deployment`,namespace,group,version,plural)
    //Remove configs
    await deleteConfigMap('test-scripts', namespace);
    await deleteConfigMap('test-fixtures', namespace);
    //runClusterTest(answers);
  } catch (error) {
    console.log(`Error executing cli ${error}`);
    console.log(chalk.green('Previous test set up deleted'));
    process.exit();
  }
};
//run cli
main();
