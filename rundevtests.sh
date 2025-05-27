#!/bin/sh
# rundevtests.sh
# set some env we require
try() {
    "$@" || return 1
}
export K6_TEST_FILE=sc1-fap-review-submission-test
export XK6_BROWSER_LOG="fatal"
export K6_BROWSER_LOG="error"
export ENVIRONMENT="local"
export BROWSER_BASE_URL=http://duo-reverse-proxy:80
export GRAPHQL_URL=http://duo-reverse-proxy:80/graphql
export PROPOSAL_LOOKUP_URL=http://localhost:4006/ProposalWebService/ProposalLookupWebService?wsdl
export SETUP_TOTAL_USERS=50
export USER_STARTING_ID=-220800000
export TEST_SETUP_CALL_ID=54
export INSTRUMENT_ID=6
export K6_PS_ITERATIONS=2
export K6_PS_VUS=50
export SETUP_TEST_USERS="true"
export SETUP_TEST_CALL="true"
export FAP_PROCESS_LOAD_TEST="true"
export FAP_CALL_ID=145
export FAP_INSTRUMENT_ID=37
export TOTAL_FAP_MEMBERS=1
export FAP_MEMBER_ROLE="fapChair"
export FAP_PROPOSALS=1
export PROPOSALS_PER_REVIEWER=1
export FAP_REVIEW_STATUS_ID=5
export SUBMITTED_STATUS_ID=15
export K6_FAP_VUS=1
export K6_FAP_ITERATIONS=1
export K6_OPENSEARCH_PASSWORD="password"
export K6_OPENSEARCH_USERNAME="admin"
export K6_OPENSEARCH_ADDRESS="https://opensearch-node1:9200"
export TEST_SETUP_DOTENV_PATH="../.env"
export K6_OPENSEARCH_CREATE_INDEX="true"
export K6_PROMETHEUS_RW_SERVER_URL="https://mimir.developers.facilities.rl.ac.uk/api/v1/push"

try
    while IFS='=' read -r key value || [ -n "$key" ]; do
        if [ -n "$value" ]; then
            if [ "$key" = "TEST_SETUP_SERVER_PORT" ]; then
                export "$key"=$(echo "$value" | sed "s/[\"']//g")
            else
                export "$key"="$(echo "$value" | sed "s/[\"']//g")"
            fi
            
        fi
    done <./.env

if [ $? -gt 0 ]; then
    echo "Failed to load environment variables from .env"
    echo "Please create .env file in local path"
    exit 1
fi

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
sleep 15
# No command provided, run both build and test by default
if [ "$SETUP_TEST_USERS" = "true" ]; then

    npm run start:docker-test-setup&
    sleep 10
    while ! nc -z localhost $TEST_SETUP_SERVER_PORT; do
        sleep 10
        echo "Local test setup server is not ready "
    done
    echo "Clean up any previous user data"
    curl -X DELETE http://localhost:8100/users/$USER_STARTING_ID/$(($USER_STARTING_ID+$SETUP_TOTAL_USERS))
fi
sleep 10

export K6_PROMETHEUS_RW_HTTP_HEADERS="X-Scope-OrgID:FASE,X-Prometheus-Remote-Write-Version:0.1.0,Authorization:Basic $MIMIR_CREDENTIAL"
export K6_PROMETHEUS_RW_TREND_STATS="p(95),p(99),min,max,sum,avg,med"
k6 run --no-usage-report --out dashboard - < <(cat ./test/${K6_TEST_FILE}.js)