import * as k8s from '@kubernetes/client-node';
import ora from 'ora';
// For parsing YAML

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
const customV1Api = kc.makeApiClient(k8s.CustomObjectsApi);
const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
const spinner = ora();

export async function deleteDeployment(
  name: string,
  namespace: string,
  labelSelector: string
) {
  spinner.start(`Deleting ${name} deployment from namespace "${namespace}"`);
  const podList = await coreV1Api.listNamespacedPod({
    namespace,
    labelSelector,
  });
  if (!podList.items.length) {
    spinner.succeed(`Deployment "${name}" already deleted form "${namespace}"`);
  }
  if (podList.items.length > 0) {
    let podsDeleted = false;
    const timeout = 60 * 1000;
    const startTime = Date.now();

    await appsV1Api.deleteNamespacedDeployment({
      name,
      namespace,
    });
    while (!podsDeleted && Date.now() - startTime < timeout) {
      const podList = await coreV1Api.listNamespacedPod({
        namespace,
        labelSelector,
      });
      if (podList.items.length === 0) {
        podsDeleted = true;
        spinner.succeed(
          `Deployment "${name}" deleted from namespace "${namespace}"`
        );
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every 1 second
    }
    if (!podsDeleted) {
      spinner.fail(
        `Failed to delete ${name} deployment from namespace "${namespace}"`
      );
      throw new Error('Timeout waiting for pods to be deleted.');
    }
  }
  return;
}

export async function deleteTestRunObjects(
  name: string,
  namespace: string,
  group: string,
  version: string,
  plural: string
) {
  spinner.start(`Deleting ${name} TestRun from namespace "${namespace}"`);
  return await customV1Api
    .deleteNamespacedCustomObject({ name, group, version, plural, namespace })
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
