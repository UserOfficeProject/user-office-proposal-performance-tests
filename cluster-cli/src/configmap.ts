import * as k8s from '@kubernetes/client-node';
import { V1ConfigMap } from '@kubernetes/client-node';
import fs from 'fs';
import ora from 'ora';

const spinner = ora();
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
export async function createConfigMapFromFile(
  name: string,
  metadata: {
    name: string;
    namespace: string;
  },
  apiVersion: string,
  kind: string,
  filePath: string
) {
  const body = fs.readFileSync(`${filePath}`, 'utf8');
  const configMap = {
    apiVersion,
    kind,
    data: {
      'test-script.js': body,
    },
    metadata,
  } as V1ConfigMap;
  return await coreV1Api
    .createNamespacedConfigMap({
      namespace: metadata.namespace,
      body: configMap,
    })
    .then(() => {
      spinner.succeed(
        `ConfigMap "${name}" created on namespace "${metadata.namespace}"`
      );
    })
    .catch((error) => {
      spinner.fail(
        `Failed to create ConfigMap "${name}" on namespace "${metadata.namespace}"`
      );
      throw new Error(error);
    });
}
export async function deleteConfigMap(name: string, namespace: string) {
  return await coreV1Api
    .deleteNamespacedConfigMap({ name, namespace })
    .then(() => {
      spinner.succeed(
        `ConfigMap "${name}" deleted from namespace "${namespace}"`
      );
    })
    .catch((error) => {
      if (error && !String(error).includes('not found')) {
        spinner.fail(
          `Failed to delete ConfigMap "${name}" from namespace "${namespace}"`
        );
        throw new Error(error);
      } else {
        spinner.succeed(
          `ConfigMap "${name}" deleted from namespace "${namespace}"`
        );
      }
    });
}
