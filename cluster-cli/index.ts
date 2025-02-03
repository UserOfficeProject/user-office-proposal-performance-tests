import { select } from '@inquirer/prompts';
import getFiles from './src/getTestFiles';

const main = async () => {
  const testFiles = await getFiles('./test');
  if (testFiles.length <= 0) {
    console.log('No test files found , please run script build:k6-test');
    process.exit();
  }
  const k6TestFile = await select({
    message: 'Select your favorite letter',
    choices: [...testFiles],
  });
  console.log("k6TestFile",k6TestFile)
};
main();
