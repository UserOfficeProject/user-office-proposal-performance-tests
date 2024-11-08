#!/bin/sh
# runtests.sh
# set some env we require
export K6_TEST_FILE=sc1-fap-review-test
export XK6_BROWSER_LOG="fatal"
export K6_BROWSER_LOG="error"
export ENVIRONMENT="local"
export BROWSER_BASE_URL=http://duo-reverse-proxy:80
export GRAPHQL_URL=http://duo-reverse-proxy:80/graphql
export SETUP_TOTAL_USERS=50
export USER_STARTING_ID=-240800000
export TEST_SETUP_CALL_ID=54
export INSTRUMENT_ID=6
export SETUP_TEST_USERS="true"
export SETUP_TEST_CALL="true"
export SETUP_TEST_REVIEWERS="true"
export SETUP_TEST_REVIEWER_ROLE="fapMember"
export K6_OPENSEARCH_PASSWORD="password"
export K6_OPENSEARCH_USERNAME="admin"
export K6_OPENSEARCH_ADDRESS="https://opensearch-node1:9200"

export K6_OPENSEARCH_CREATE_INDEX="true"



for arg in "$@"; do
  KEY=$(echo "$arg" | cut -d= -f1)
  VALUE=$(echo "$arg" | cut -d= -f2)
    if [[ -z "${VALUE}" ]]; then
        echo "${KEY} has no value"
    else
        export "$KEY"="$VALUE"
    fi
done
export K6_TEST_ID="$K6_TEST_FILE-$(date +"%d/%m/%y:%H:%M")"
echo "K6_TEST_ID: $K6_TEST_ID" 
# remove shreenshots
rm -rf ./screenshots

npm run build:k6-test&
sleep 10
# No command provided, run both build and test by default
if [ "$SETUP_TEST_USERS" == "true" ]; then

    npm run start:docker-test-setup&
    sleep 10
    while ! nc -z localhost 8100; do
        sleep 5
        echo "Local test setup server is not ready "
    done
fi
sleep 10

# Dashboard url:http://localhost:5665
# Test can also out put to std using --out logger
# Test can also be out put to opensearch --out xk6-output-opensearch 
k6 run --no-usage-report --out dashboard - < <(cat ./test/${K6_TEST_FILE}.js)