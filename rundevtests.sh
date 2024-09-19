#!/bin/sh
# runtests.sh
# set some env we require
export XK6_BROWSER_LOG="fatal"
export K6_BROWSER_LOG="error"
export ENVIRONMENT="local"
export BROWSER_BASE_URL=http://duo-reverse-proxy:80
export GRAPHQL_URL=http://duo-reverse-proxy:80/graphql
export SETUP_TOTAL_USERS=50
export USER_STARTING_ID=-240800000
export TEST_SETUP_CALL_ID=1
export SETUP_TEST_USERS="true"
export SETUP_TEST_CALL="true"

for arg in "$@"; do
  KEY=$(echo "$arg" | cut -d= -f1)
  VALUE=$(echo "$arg" | cut -d= -f2)
    if [[ -z "${VALUE}" ]]; then
        echo "${KEY} has no value"
    else
        export "$KEY"="$VALUE"
    fi
done

# remove shreenshots
rm -rf ./screenshots

npm run build:k6-test&
sleep 10
# No command provided, run both build and test by default
if [ "$SETUP_TEST_USERS" == "true" ]; then
	echo "Setting up users"
    npm run build:test-setup&
    sleep 10&
    npm run start:test-setup&
    while ! nc -z localhost 8100; do
        sleep 5
        echo "Local test setup server is not ready "
    done
    echo "Clean up any previous user data"
    curl -X DELETE http://localhost:8100/users/$USER_STARTING_ID/$(($USER_STARTING_ID+$SETUP_TOTAL_USERS))
fi
sleep 10

# Dashboard url:http://localhost:5665
# Test can also out put to std using --out logger
k6 run --no-usage-report --out dashboard - < <(cat ./test/sc1-proposal-submission-test.js)

if [ "$SETUP_TEST_USERS" == "true" ]; then
  echo "Clean up  created user data"
  curl -X DELETE http://localhost:8100/users/$USER_STARTING_ID/$(($USER_STARTING_ID+$SETUP_TOTAL_USERS))
fi