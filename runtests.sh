#!/bin/sh
# runtests.sh

# No command provided, run both build and test by default
npm run dev:build:k6-test &
sleep 10 &
npm run dev:start:user-setup &
sleep 10 

k6 run --no-usage-report - < <(cat ./apps/k6-tests/test/load-test.js)
