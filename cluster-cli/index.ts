import chalk from 'chalk';
import { getUserPromptAnswer } from './src/answers';
import { deleteDeployment } from './src/deployments';
import { deleteConfigMap } from './src/configmap';
const testTestUpDeployment = 'test-setup-deployment';
const namespace = 'apps';

const main = async () => {
  try {
    //Prompt user for configs
    await getUserPromptAnswer();

    //Remove previous deployments
    await deleteDeployment(namespace, testTestUpDeployment);

    //Remove configs
    await deleteConfigMap("test-scripts", namespace)
    //runClusterTest(answers);
  } catch (error) {
    console.log(`Error executing cli ${error}`);
    console.log(chalk.green('Previous test set up deleted'));
    process.exit();
  }
};
//run cli
main();
