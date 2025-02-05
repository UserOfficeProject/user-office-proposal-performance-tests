import * as k8s from '@kubernetes/client-node';
import ora from 'ora';

const spinner = ora();
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

export async function deleteConfigMap(name: string, namespace: string) {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

  return await k8sApi
      .deleteNamespacedConfigMap({ name, namespace })
      .then(() => {
        spinner.succeed(`ConfigMap "${name}" deleted from namespace "${namespace}"`);
      })
      .catch((error) => {
        if (error && !String(error).includes('not found')) {
          spinner.fail(`Failed to delete ConfigMap "${name}" from namespace "${namespace}"`);
          throw new Error(error);
        } else {
          spinner.succeed(`ConfigMap "${name}" deleted from namespace "${namespace}"`);
        }
      });

}
