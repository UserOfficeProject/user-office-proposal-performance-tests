This repository contains performance monitoring tests written with k6 and the necessary custom extensions for the UOP.

## What's Included:

k6 Load Test Scripts (/src/*.ts):** These tests we run then against the [proposal system](https://github.com/UserOfficeProject/user-office-core).
Go k6 Extensions (/extensions/): These custom extensions provide functionalities beyond the core k6 library, primarily for interacting with oracle and PostgreSQL.

### Running Tests Locally:

#### Prerequisites:

* Ensure you have Node.js and npm (or yarn) installed on your system.
* [Install k6](https://grafana.com/docs/k6/latest/set-up/install-k6) using any of the suitable methods
* Install all node packages with : ``npm install``

#### Compiling Tests:
* Build tests with ``npm run build`` this compile your TypeScript test scripts into JavaScript files (.js) and place then in the test directory.

#### Running a test script:
* Executed tests with ``k6 run test/<test name>.js`` e.g (``k6 run test/sc1-load-test.js``)
* You can customize the test execution with [k6 options](https://grafana.com/docs/k6/latest) 

#### Running Tests with fba-compose(STFC):
We made it much easier to run performance tests in STFC dev environment.
* Create a token to use as value of ``GRAPHQL_TOKEN`` with the following minimum permissions.This covers set up and teardown during tests .Individual tests may require their own permissions, update the permissions on the token accordingly.
  1. CallQueries.get
  2. ProposalQueries.get
  3. ProposalQueries.getAll
  4. ProposalMutations.delete
  5. TemplateMutations.createTemplate
  6. TemplateMutations.deleteTemplate
  7. ProposalMutations.delete
  8. CallMutations.delete
  9. CallMutations.create
* Create a local file ``.k6rc`` in the test root directory.The the minimum field are set in ``k6rc.example``.
* Build tests image with ``fba-compose build proposal-performance-test`` this build an image with all the necessary files.
* Run tests with ``fba-compose run proposal-performance-test``.If you have included a new test file update ``rundevtests.sh`` 

#### Running Tests with Jenkins(STFC):
We have a [jenkins job](https://ci.developers.facilities.rl.ac.uk/view/ProposalLoadTest/job/Dev_Execute_ProposalLoadTestK6) that execute once every night which make use of ``Jenkinsfile.dev``.New test files and configurations may require changes to the jenkins pipe line file.

## Adding new tests:

* Create a new TypeScript file (with .ts extension) in the src directory.
* Follow the existing test structure and utilize TypeScript features for type safety and code organization.

## Adding New Database Functionality:

The Go k6 extensions provide a foundation for interacting with various databases. To add support for a new database:

* Make changes to ``sql.go`` this will require setting up Go environment.Follow building [k6 extensions](https://grafana.com/docs/k6/latest/extensions/build-k6-binary-using-go/) and for our custom extension draw inspiration form [k6 sql](https://github.com/grafana/xk6-sql)

## Why TypeScript and Webpack:
TypeScript provides type safety, catching potential errors early in the development process and improving code maintainability.
While not strictly required for k6, using a build tool like Webpack can help manage dependencies, automate tasks like compilation, and bundling tests.