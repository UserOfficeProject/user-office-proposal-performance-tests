#!/bin/sh
# runtests.sh
# remove shreenshots
rm -rf ./screenshots
# No command provided, run both build and test by default
npm run build&
sleep 10 &
npm run start:test-setup&
sleep 10


# set some env we require
export XK6_BROWSER_LOG="fatal"
export K6_BROWSER_LOG="error"
export ENVIRONMENT="local"
export BROWSER_BASE_URL=http://duo-reverse-proxy:80
export GRAPHQL_URL=http://duo-reverse-proxy:80/graphql
export SETUP_TOTAL_USERS=50
export USER_STARTING_ID=-240800000

while ! nc -z localhost 8100; do
    sleep 5
    echo "Local test setup server is not ready "
done
echo "Clean up any previous user data"
curl -X DELETE http://localhost:8100/users/$USER_STARTING_ID/$(($USER_STARTING_ID+$SETUP_TOTAL_USERS))
# Dashboard url:http://localhost:5665
# Test can also out put to std using --out logger
k6 run --no-usage-report --out dashboard - < <(cat ./test/sc1-basic-proposal-submission-test.js)

echo "Clean up  created user data"
curl -X DELETE http://localhost:8100/users/$USER_STARTING_ID/$(($USER_STARTING_ID+$SETUP_TOTAL_USERS))
