#!/bin/sh
# runtests.sh
# remove shreenshots
rm -rf ./screenshots
# No command provided, run both build and test by default
npm run build&
sleep 10


# set some env we require
export XK6_BROWSER_LOG="fatal"
export K6_BROWSER_LOG="error"
export ENVIRONMENT="local"
export BROWSER_BASE_URL=http://duo-reverse-proxy:80
export GRAPHQL_URL=http://duo-reverse-proxy:80/graphql

# To pass VUS and Iterations uncomment and pass these envs
# export SC1_BROWSER_VUS=20
# export SC1_GRAPHQL_VUS=80
# export SC1_GRAPHQL_ITERATIONS=5
# export SETUP_TOTAL_USERS=500
# export SC1_BROWSER_VUS_ITERATIONS=3

k6 run --no-usage-report - < <(cat ./test/sc1-load-test.js)

