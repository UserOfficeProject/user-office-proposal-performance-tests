#!/bin/sh
# runtests.sh

# No command provided, run both build and test by default
npm run build &
sleep 10 &
npm run dev:start:user-setup &
sleep 10 

k6 run --no-usage-report - < <(cat ./apps/k6-tests/test/load-test.js)
