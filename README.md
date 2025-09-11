---
---
# User Office Proposal Performance Testing

This repository contains tools and scripts for performance monitoring and testing of systems. It focuses on ensuring that applications maintains acceptable performance under various load conditions.Testing is done using [K6](https://grafana.com/docs/k6/) one of the leading leading load testing tool.Some tools have their own folders [test-setup](test-setup/README.md), [cluster-cli](cluster-cli/README.md).

This repository is specifically used by the submission team to conduct performance testing on systems ,by simulating varying levels of user load this gives us an ability to identify and address potential performance issues, to avoid performance degradation during peak usage periods.For our tests metrics we send to mimir when running tests on the cluster.They can be viewed in grafana dashboard.

## Documentation

### Prerequisites

* **Kubernetes Cluster(Optional):** A Kubernetes cluster configured for running performance tests with K6 operator.
* **Node.js and npm:** Required for running the CLI and test setup server.
* **k6(Optional):** [Install k6](https://grafana.com/docs/k6/latest/set-up/install-k6) using any of the suitable methods

### Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/UserOfficeProject/user-office-proposal-performance-tests
    cd user-office-proposal-performance-tests
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```
3.  **Build tests:**

    ```bash
    npm run build
    ```
4.  **Environment Variables:**

    * Create a `.env` file based on `env.example` and fill in the required variables.
    * `kubectl` must be configured to connect to your Kubernetes cluster if tests are to run on the cluster.

### Running a tests:
#### **Running local with out fba-compose:** 
* Executed tests with ``k6 run test/<test name>.js`` e.g (``k6 run test/sc1-load-test.js``) 
#### **Running local with out fba-compose and stream the load test's result to grafana dashboard
* Execute test with command ``k6 run --tag testid=<test id> --no-usage-report --out experimental-prometheus-rw ./test/<test file name>.js``
#### **Running Tests with fba-compose(STFC):** ```Use `fba-compose` and `rundevtests.sh` to build and run the test setup server locally.```
 * Create a token to use as value of ``GRAPHQL_TOKEN`` with all the required permissions.This covers set up and teardown during tests .Individual tests may require their own permissions, update the permissions on the token accordingly.
    ```txt
    1. CallQueries.get
    2. ProposalQueries.get
    3. ProposalQueries.getAll
    4. ProposalMutations.delete
    5. TemplateMutations.createTemplate
    6. TemplateMutations.deleteTemplate
    7. ProposalMutations.delete
    8. CallMutations.delete
    9. CallMutations.create
    10. QuestionaryQueries.getQuestionaryOrDefault 
    ```
* Build tests image with `fba-compose build proposal-performance-test` this build an image with all the necessary files.
* Run tests with `fba-compose run ` and `--service-ports` can be set as a flag to view results in the [k6 dashboard](https://github.com/grafana/xk6-dashboard) on `http://127.0.0.1:5665`.If you have included a new test file update `rundevtests.sh` 

#### **Running Tests with on Cluster (STFC):**
* Run test using [jenkins job](https://ci.developers.facilities.rl.ac.uk/view/ProposalLoadTest/job/Dev_Execute_ProposalLoadTestK6).New test files and configurations may require changes to the jenkins pipe line file.
* Run test using [cluster cli](cluster-cli/README.md) on a local or remote cluster.
* Run test using [run-cluster.sh](run-cluster.sh) on a local or remote cluster.

## Repository Structure

* **`src/`:**
    * Contains K6 test scripts used for load testing.
* **`test/`:**
    * Contains complied K6 test scripts used for load testing.
* **`cluster-cli/`:**
    * Contains a Node.js [cluster cli](cluster-cli/README.md) for managing test runs within a Kubernetes cluster.
* **`test-setup/`:**
    * Provides a Node.js [test setup](test-setup/README.md) express server for providing user test data.
* **`resources/`:**
    * Contains Kubernetes YAML configurations for deploying and running tests.
    * Includes configurations for K6 TestRuns and other required resources.
* **`fixtures/`:**
    * Contains files that are used by the test scripts, such as pdf documents.
* **`helm/`:**
    * Contains yml files that are used to set up our cluster.
* **`Jenkinsfile.build`:**
    * [Jenkins job](https://ci.developers.facilities.rl.ac.uk/view/ProposalLoadTest/job/Dev_Build_ProposalLoadTestK6/) to build images for cluster tests and push them to harbor on `isisbusapps/op-performance-tests-k6/<tag>` and `isisbusapps/uop-performance-tests-setup/<tag>`.
* **`Jenkinsfile.runcluster`:**
    * [Jenkins job](https://ci.developers.facilities.rl.ac.uk/view/ProposalLoadTest/job/Dev_Execute_ProposalLoadTest.ClusterSetup/) to set up our cluster.
* **`Jenkinsfile.setupcluster`:**
    * [Jenkins job](https://ci.developers.facilities.rl.ac.uk/view/ProposalLoadTest/job/Dev_Execute_ProposalLoadTestK6/) for running tests on the cluster.
* **`env.example`:**
    * Example `.env` file for configuring environment variables.

## Adding new tests:

* Create a new TypeScript file (with ``test.ts extension``) in the src directory following [K6 documentation](https://grafana.com/docs/k6).The file must include the freise `test` for it to be picked up for compile by webpack.
* Follow the existing test structure and utilize TypeScript features for type safety and code organization.