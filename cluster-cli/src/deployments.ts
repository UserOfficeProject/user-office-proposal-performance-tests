import * as k8s from '@kubernetes/client-node';
import ora from 'ora';
// For parsing YAML

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
const customV1Api = kc.makeApiClient(k8s.CustomObjectsApi);
const spinner = ora();

export async function deleteDeployment(name: string, namespace: string) {
  spinner.start(`Deleting ${name} deployment from namespace "${namespace}"`);
  return await appsV1Api
    .deleteNamespacedDeployment({ name, namespace })
    .then(() => {
      spinner.succeed(
        `Deployment "${name}" deleted from namespace "${namespace}"`
      );
    })
    .catch((error) => {
      if (error && !String(error).includes('not found')) {
        spinner.fail(
          `Failed to delete ${name} deployment from namespace "${namespace}"`
        );
        throw new Error(error);
      } else {
        spinner.succeed(
          `Deployment "${name}" deleted from namespace "${namespace}"`
        );
      }
    });
}

export async function deleteTestRunObjects(name: string, namespace: string,group: string,version: string,plural: string) {

  spinner.start(`Deleting ${name} TestRun from namespace "${namespace}"`);
  return await customV1Api.deleteNamespacedCustomObject({name,group,version,plural,namespace})
    .then(() => {
      spinner.succeed(
        `TestRun "${name}" deleted from namespace "${namespace}"`
      );
    })
    .catch((error) => {
      if (error && !String(error).includes('not found')) {
        spinner.fail(
          `Failed to delete ${name} TestRun  from namespace "${namespace}"`
        );
        throw new Error(error);
      } else {
        spinner.succeed(
          `TestRun"${name}" deleted from namespace "${namespace}"`
        );
      }
    });
}
