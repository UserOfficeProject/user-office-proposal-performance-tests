#!/bin/bash
export K6_TEST_NAME=sc1-proposal-submission-test
export TEST_SETUP_VERSION_TAG=0.0.5
export BROWSER_BASE_URL=https://devproposal.facilities.rl.ac.uk
export GRAPHQL_URL=https://devproposal.facilities.rl.ac.uk/graphql
export PROPOSAL_LOOKUP_URL=https://devapis.facilities.rl.ac.uk/ws/ProposalLookupWebService?wsdl
export TEST_SETUP_URL=http://test-setup:8100
export K6_PS_VUS=50
export K6_PS_ITERATIONS=2
export K6_SETUP_TOTAL_USERS=250
export TEST_SETUP_CALL_ID=301
export FAP_PROCESS_LOAD_TEST="true"
export FAP_CALL_ID=145
export FAP_INSTRUMENT_ID=37
export TOTAL_FAP_MEMBERS=10
export FAP_MEMBER_ROLE="fapMember"
export FAP_PROPOSALS=30
export PROPOSALS_PER_REVIEWER=3
export FAP_REVIEW_STATUS_ID=5
export SUBMITTED_STATUS_ID=15
export K6_FAP_VUS=10
export K6_FAP_ITERATIONS=1
export K6_TEST_PARALLELISM=2
export SETUP_TEST_USERS="true"
export SETUP_TEST_CALL="true"
export IS_CLUSTER_TEST_RUN="true"
export INSTRUMENT_ID=9
export FIRST_USER_ID=-220800000
export K6_PROMETHEUS_RW_SERVER_URL="https://mimir.developers.facilities.rl.ac.uk/api/v1/push"
export K6_PROMETHEUS_RW_TREND_STATS="p(95),p(99),min,max,sum,avg,med"

for arg in "$@"; do
  KEY=$(echo "$arg" | cut -d= -f1)
  VALUE=$(echo "$arg" | cut -d= -f2)
    if [[ -z "${VALUE}" ]]; then
        echo "${KEY} has no value"
    else
        export "$KEY"="$VALUE"
    fi
done
root_config_dir="$(dirname $(realpath $0))"
export K6_TEST_ID="$K6_TEST_NAME-$(date +"%d/%m/%y:%H:%M")"
echo "K6_TEST_ID: $K6_TEST_ID"
export K6_TEST_FILE="$K6_TEST_NAME.js"
echo "K6_TEST_FILE: $K6_TEST_FILE"

echo "Removing previous test setup ..."
kubectl delete deployment/test-setup-deployment  -n apps  --ignore-not-found &> /dev/null
kubectl wait pods -l app=test-setup -n apps --timeout=-60s --for=delete &> /dev/null

sleep 5

echo "Removing previous k6 test $K6_TEST_NAME ..."
envsubst < $root_config_dir/resources/basic-test.yaml | kubectl delete -f - -n apps --ignore-not-found 1> /dev/null
kubectl delete configmap test-scripts -n apps --ignore-not-found
kubectl delete configmap test-fixtures  -n apps --ignore-not-found
sleep 5

if [ "$SETUP_TEST_USERS" == "true" ]; then
  echo "Starting new load test setup ..."
  envsubst < $root_config_dir/kubernetes/test-setup/deployment.yaml | kubectl apply -f - -n apps 1> /dev/null
  kubectl apply -f $root_config_dir/kubernetes/test-setup/service.yaml  -n apps 1> /dev/null
  kubectl wait deployment/test-setup-deployment  -n apps  --timeout=120s --for condition=Available=True 1> /dev/null
fi

sleep 5

echo "Add load test configmap ..."
kubectl create configmap test-scripts -n apps  --from-file=$root_config_dir/test/$K6_TEST_FILE
sleep 5

echo "Add load test fixtures ..."
kubectl create configmap test-fixtures -n apps --from-file=$root_config_dir/fixtures/
sleep 5

echo "Start load test ..."
envsubst < $root_config_dir/resources/basic-test.yaml | kubectl apply -f - -n apps 1> /dev/null

k6_pod_runners=0
attempts=1
while [[ $k6_pod_runners -le 0 && $attempts -le 10 ]]; do
  k6_pod_runners=$(kubectl get pods -o json -n apps | jq '.items[] | select(.metadata.labels["app"] == "k6" and .metadata.labels["runner"] == "true") | .status.phase' | grep -c "Running")
  echo "Number of k6 pod runners: $k6_pod_runners  attempt: $attempts"

  if [[ $k6_pod_runners -ge 1 ]]; then
    break
  fi

  echo "Waiting for k6 pod runners ..."
  attempts=$((attempts + 1))
  sleep 10
done

if [[ $k6_pod_runners -gt 0 ]]; then
  echo "k6 pod runners greater than zero proceeding ..."
else
  echo "Could not initilise k6 pod runners after 10 attempts. Aborting."
  envsubst < $root_config_dir/resources/basic-test.yaml | kubectl delete -f - -n apps --ignore-not-found 1> /dev/null
  kubectl delete configmap test-scripts -n apps --ignore-not-found
  kubectl delete configmap test-fixtures -n apps --ignore-not-found
  echo "Removing test setup"
  kubectl delete deployment/test-setup-deployment -n apps  &> /dev/null
  kubectl wait pods -l app=test-setup -n apps --timeout=-60s --for=delete &> /dev/null
  exit 1
fi
k6_pod_runners_failed=0 
k6_pod_runners_succeeded=0
k6_pod_runners_finished_tests=0
#Tests will terminate after 2 hours
k6_test_timeout=7200
test_start_time=$(date +%s)
while [[ $k6_pod_runners -gt $k6_pod_runners_finished_tests ]]; do
  results=$(kubectl get pods -o json -n apps | jq '.items[] | select(.metadata.labels["app"] == "k6" and .metadata.labels["runner"] == "true") | .status.phase')
  k6_pod_runners_failed=$(echo "$results" | grep -c 'Failed')
  k6_pod_runners_succeeded=$(echo "$results" | grep -c 'Succeeded')
  k6_pod_runners_finished_tests=$(($k6_pod_runners_failed + $k6_pod_runners_succeeded))
  echo "k6 pod runners which have completed tests $k6_pod_runners_finished_tests"
  if [[ $k6_pod_runners -eq $k6_pod_runners_finished_tests ]]; then
    break
  fi
  elapsed_time=$(($(date +%s) - $test_start_time))
  if [[ $elapsed_time -ge $k6_test_timeout ]]; then
      echo "Timeout reached. Terminating k6 test."
      break
  fi
  echo "Waiting for k6 test to finish..."
  sleep 10
done

sleep 5

if [ "$SETUP_TEST_USERS" == "true" ]; then
  echo "Removing test setup"
  kubectl delete deployment/test-setup-deployment -n apps  &> /dev/null
  kubectl wait pods -l app=test-setup -n apps --timeout=-60s --for=delete &> /dev/null
fi

echo "k6 test pod(s) failed: $k6_pod_runners_failed"
echo "k6 test pod(s) successful: $k6_pod_runners_succeeded"
if [[ $k6_pod_runners_succeeded -ge $k6_pod_runners_finished_tests ]]; then
  echo "K6 tests where successful"
  envsubst < $root_config_dir/resources/basic-test.yaml | kubectl delete -f - -n apps --ignore-not-found 1> /dev/null
  kubectl delete configmap test-scripts -n apps --ignore-not-found
  kubectl delete configmap test-fixtures  -n apps --ignore-not-found
  exit 0
else
  echo "k6 test failed."
  envsubst < $root_config_dir/resources/basic-test.yaml | kubectl delete -f - -n apps --ignore-not-found 1> /dev/null
  kubectl delete configmap test-scripts -n apps --ignore-not-found
  kubectl delete configmap test-fixtures -n apps --ignore-not-found
  exit 1
fi