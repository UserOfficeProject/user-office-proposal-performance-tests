#!/bin/sh
# runtests.sh

# No command provided, run both build and test by default
npm run dev:build:k6-test &
sleep 10 &
npm run dev:start:user-setup &
sleep 10 

# set some env we require
export XK6_BROWSER_LOG="fatal"
export K6_BROWSER_LOG="error"
export ENVIRONMENT="development"
export BROWSER_BASE_URL=http://duo-reverse-proxy:80
export GRAPHQL_URL=http://duo-reverse-proxy:80/graphql
export USER_SETUP_DOTENV_PATH="/app/apps/user-setup/.env"

# To pass VUS and Iterations uncomment and pass these envs
# export SC1_BROWSER_VUS=20
# export SC1_GRAPHQL_VUS=80
# export SC1_GRAPHQL_ITERATIONS=5

k6 run --no-usage-report - < <(cat ./apps/k6-tests/test/sc1-load-test.js)

