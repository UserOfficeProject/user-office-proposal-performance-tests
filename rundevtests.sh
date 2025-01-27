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
export USER_STARTING_ID=-220800000
export SETUP_TOTAL_REVIEWERS=7
export REVIEWER_STARTING_IDS=-220800000
export TEST_SETUP_CALL_ID=154
export K6_PS_ITERATIONS=2
export TEST_SETUP_FAP_ID=1
export TEST_SET_UP_PROPOSAL_PKS=1
export TEST_SET_UP_INSTRUMENT_ID=39
export FAP_PROPOSALS=5
export PROPOSALS_PER_REVIEWER=2
export FAP_REVIEW_STATUS_ID=5
export SUBMITTED_STATUS_ID=15
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
sleep 15
# No command provided, run both build and test by default
if [ "$SETUP_TEST_USERS" == "true" ]; then

    npm run start:docker-test-setup&
    sleep 10
    while ! nc -z localhost 8100; do
        sleep 10
        echo "Local test setup server is not ready "
    done
    echo "Clean up any previous user data"
    curl -X DELETE http://localhost:8100/users/$USER_STARTING_ID/$(($USER_STARTING_ID+$SETUP_TOTAL_USERS))
fi
sleep 10

k6 run --no-usage-report --out dashboard - < <(cat ./test/${K6_TEST_FILE}.js)

if [ "$SETUP_TEST_USERS" = "true" ]; then
    echo "Clean up created user data"
    curl -X DELETE http://localhost:8100/users/$USER_STARTING_ID/$(expr $USER_STARTING_ID + $SETUP_TOTAL_USERS)
fi

if [ "$SETUP_TEST_REVIEWERS" = "true" ]; then
    echo "Clean up reviewers data"
    reviewer_ids=""
    i=0
    while [ $i -lt $SETUP_TOTAL_REVIEWERS ]; do
        current_id=$(($REVIEWER_STARTING_IDS - $i))
        reviewer_ids="$reviewer_ids$current_id"
        i=$(expr $i + 1)

        if [ $i -lt $SETUP_TOTAL_REVIEWERS ]; then
            reviewer_ids="$reviewer_ids,"
        fi
    done

    echo "Reviewer IDs: $reviewer_ids"

    curl --location --request DELETE 'http://localhost:8100/users/removeRole' \
    --header 'Content-Type: application/json' \
    --data "{
        \"ids\": [$reviewer_ids],
        \"roleName\": \"$SETUP_TEST_REVIEWER_ROLE\"
    }"
fi