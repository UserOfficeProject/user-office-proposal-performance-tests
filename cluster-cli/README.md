# Test cluster CLI

This directory contains a command-line interface (CLI) to automate the setup, execution, and cleanup of performance tests within a Kubernetes cluster. This uses [@kubernetes/client-node](https://github.com/kubernetes-client/javascript#readme) to manage Deployments, ConfigMaps, and TestRuns.

## Purpose

`user-office-proposal-performance-tests/cluster` is a Node.js based cli to manage test runs on cluster.

## Prerequisites

* **Node.js and npm installed:** Ensure Node.js and npm are installed on your local machine.
* **kubectl configured:** `kubectl` must be configured to connect to your Kubernetes cluster. This can be achieved by setting the `KUBECONFIG` environment variable. For example:

    ```bash
    export KUBECONFIG=~/kubeconfig.cluster
* **Cluster configured for K6 load testing:** The Kubernetes cluster must be configured to support K6 load testing using the [K6 Operator](https://github.com/grafana/k6-operator). This configuration is automated using `Jenkinsfile.setupcluster`, which executes our Helm chart configurations.

## Documentation

### Setup and Installation

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/UserOfficeProject/user-office-proposal-performance-tests
    cd user-office-proposal-performance-tests/cluster
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

### Usage

1.  **Start the cluster test:**

    ```bash
    npm run cluster-cli:start
    ```
### Test Workflow

1.  **Check for Running Tests:** The CLI checks if tests are running in the specified namespace.
2.  **Confirmation:** If tests are running, it prompts the user to stop them.
3.  **User Input:** Prompts the user for test configuration parameters.
4.  **Test Cleanup:** Deletes any existing test resources.
5.  **Test Setup:** Creates ConfigMaps and deploys test setup resources.
6.  **Test Execution:** Creates K6 TestRun objects to run the tests.
7.  **Test Monitoring:** Monitors test pod status and waits for completion.
8.  **Test Cleanup:** Deletes all test resources.

