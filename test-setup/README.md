---
title: Test Setup Server readme
tags:
 - markdown
---
# Test Setup Server

This directory contains the test setup server used to provide user logins during load testing.

## Purpose

`user-office-proposal-performance-tests/test-setup` is a Node.js-based Express server deployed within the cluster or locally to provide login credentials.

1.  **Environment Initialization:**
    * Loads environment variables from a `.env` file or from cluster secrets.
2.  **Database Connection Establishment:**
    * Establishes a connection to an Oracle database using `oracledb`.
3.  **Express Server Setup:**
    * Creates an Express application to handle HTTP requests and provide user login endpoints.
4.  **User Pre-population:**
    * Creates a predefined number of test users (500).
5.  **Server Startup:**
    * Starts the Express server, listening on a specified port (default: 8100).
6.  **Cleanup on Exit:**
    * Cleans up user data on termination.

## Documentation

### Setup and Installation

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/UserOfficeProject/user-office-proposal-performance-tests
    cd user-office-proposal-performance-tests/test-setup
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure `.env`:**

    * Create a `.env` file in the root directory or the parent directory,
    * Ensure all necessary environment variables are set, including database connection details and port number,using `env.example` as a template.
    * For cluster deployments, ensure that necessary secrets are configured correctly using `Jenkinsfile.setupcluster`.

### Usage

1.  **Start the Server:**

    ```bash
    node index.js # or node <script_name>.js
    ```

2.  **Accessing Endpoints:**

    * Server's endpoints can be accessed on `http://localhost:<PORT>/<endpoint>`, where `<PORT>` is the port number (default: 8100) and `<endpoint>` is the specific endpoint path.
    * The `/health` endpoint is available for checking the server's status.
    * The server is designed to provide endpoints for load testing.

### Environments

1.  **Local Development:**
    * **Image Building:** To build the Docker image, execute `fba-compose build proposal-performance-test`. This command creates the container image based on the `Dockerfile` in this directory.
    * **Server Startup:** The server is started by running `fba-compose up proposal-performance-test` using the `rundevtests.sh` script.
        * `rundevtests.sh` is a script sets up environment variables for local set up.

2.  **Cluster Deployment:**
    * **Jenkinsfile.build:**
        * **Image Building:** The Docker image is built using the `Jenkinsfile.build` pipeline. This pipeline executes the necessary steps to create a container image based on the `Dockerfile`. The resulting image is pushed to the Harbor registry: `harbor.stfc.ac.uk/isisbusapps/uop-performance-tests-setup:<TEST_SETUP_VERSION_TAG>`.
    * **Server Startup:**
        * **Cluster Deployment via Jenkins:** The server is deployed within the cluster using the `run-cluster.sh` script, which is triggered by the `Jenkinsfile.runcluster` pipeline. This pipeline automates the deployment process within the cluster environment.
        * **Local Cluster Deployment (CLI):** For local testing using the cluster, the server can be deployed using the command:
            ```bash
            npm run cluster-cli:start
            ```
