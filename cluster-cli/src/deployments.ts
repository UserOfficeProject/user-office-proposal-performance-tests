import * as k8s from '@kubernetes/client-node';
import ora from 'ora';
import fs from 'fs';
import yaml from 'js-yaml';
import { V1Deployment } from '@kubernetes/client-node';
import { Answers } from './initValues';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
const customV1Api = kc.makeApiClient(k8s.CustomObjectsApi);
const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
const spinner = ora();

export async function getTestsPodsRunning(
  namespace: string,
  appLabels: { key: string; value: string }[],
  statuses: string[]
) {
  const pods = await coreV1Api
    .listNamespacedPod({ namespace })
    .catch((error) => {
      throw new Error(error);
    });
  const runningPods = pods.items.filter((pod) => {
    const labels = pod.metadata?.labels || {};
    const phase = pod.status?.phase || '';
    return (
      appLabels.some((value) => {
        return value.key in labels && labels[value.key] === value.value;
      }) && statuses.includes(phase)
    );
  });
  return runningPods.length;
}
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
    spinner.succeed(
      `Deployment "${name}" deleted from namespace "${namespace}"`
    );
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

export async function createDeployment(
  name: string,
  labelSelector: string,
  namespace: string,
  yamlPath: string,
  answers: Answers
) {
  spinner.start(`Creating ${name} deployment to namespace "${namespace}"`);
  const yamlFile = fs.readFileSync(yamlPath, 'utf8');
  let substitutedYaml = yamlFile;
  for (const [key, value] of Object.entries(answers)) {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    substitutedYaml = substitutedYaml.replace(regex, String(value));
  }
  const body = yaml.load(substitutedYaml) as V1Deployment;
  await appsV1Api.createNamespacedDeployment({ namespace, body });

  let podsCreated = false;
  const timeout = 60 * 1000;
  const startTime = Date.now();

  while (!podsCreated && Date.now() - startTime < timeout) {
    const pods = await coreV1Api.listNamespacedPod({
      namespace,
      labelSelector,
    });
    const podList = pods.items.filter((pod) => {
      return pod.status?.phase === 'Running';
    });
    if (podList.length > 0) {
      podsCreated = true;
      spinner.succeed(
        `Deployment "${name}" created on namespace "${namespace}"`
      );
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (!podsCreated) {
    spinner.fail(
      `Failed to create ${name} deployment on namespace "${namespace}"`
    );
    throw new Error('Timeout waiting for pods to be created.');
  }
  return;
}

export async function createNamedJobs(
  namespace: string,
  labelSelector: string,
  group: string,
  version: string,
  plural: string,
  yamlPath: string,
  answers: Answers
) {
  spinner.start(`Creating ${namespace} deployment to namespace "${namespace}"`);
  const yamlFile = fs.readFileSync(yamlPath, 'utf8');
  let substitutedYaml = yamlFile;
  for (const [key, value] of Object.entries(answers)) {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    substitutedYaml = substitutedYaml.replace(regex, String(value));
  }
  const body = yaml.load(substitutedYaml) as V1Deployment;
  await customV1Api.createNamespacedCustomObject({
    group,
    version,
    plural,
    namespace,
    body,
  });
  let podsCreated = false;
  const timeout = 60 * 1000;
  const startTime = Date.now();

  while (!podsCreated && Date.now() - startTime < timeout) {
    const pods = await getTestsPodsRunning(
      namespace,
      [{ key: 'app', value: labelSelector }],
      ['Running']
    );

    if (pods >= +answers.K6_TEST_PARALLELISM) {
      podsCreated = true;
      spinner.succeed(
        `Test deployment ${answers.K6_TEST_NAME} created on namespace "${namespace}"`
      );
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (!podsCreated) {
    spinner.fail(
      `Failed to create ${answers.K6_TEST_NAME} deployment on namespace "${namespace}"`
    );
    throw new Error('Timeout waiting for test pods to be created.');
  }
  return;
}

export async function deletePods(namespace: string, appLabels: string[]) {
  spinner.start(`Deleting pods from namespace "${namespace}"`);
  const pods = await coreV1Api.listNamespacedPod({
    namespace,
  });
  const podList = pods.items.filter((pod) => {
    const labels = pod.metadata?.labels || {};
    return appLabels.includes(labels['app']);
  });
  if (!podList.length) {
    spinner.succeed(`Deleted pods from namespace "${namespace}"`);
  }
  if (podList.length > 0) {
    let podsDeleted = false;
    const timeout = 60 * 1000;
    const startTime = Date.now();

    await Promise.all(
      podList.map(async (pod) => {
        const name = pod.metadata?.name;
        if (!name) {
          return;
        }
        return await coreV1Api.deleteNamespacedPod({ name, namespace });
      })
    );
    while (!podsDeleted && Date.now() - startTime < timeout) {
      const pods = await coreV1Api.listNamespacedPod({
        namespace,
      });
      const podList = pods.items.filter((pod) => {
        const labels = pod.metadata?.labels || {}; // Handle cases where labels are undefined
        return appLabels.includes(labels['app']);
      });
      if (podList.length === 0) {
        podsDeleted = true;
        spinner.succeed(`Deleted pods from namespace "${namespace}"`);
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every 1 second
    }
    if (!podsDeleted) {
      spinner.fail(`Failed to delete $pods from namespace "${namespace}"`);
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
