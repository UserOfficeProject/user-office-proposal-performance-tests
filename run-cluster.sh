#!/bin/bash
export K6_TEST_FILE=sc1-proposal-submission-test
export K6_VERSION_TAG=0.0.2
export TEST_SETUP_VERSION_TAG=0.0.2
export BROWSER_BASE_URL=https://devproposal.facilities.rl.ac.uk
export GRAPHQL_URL=https://devproposal.facilities.rl.ac.uk/graphql
export TEST_SETUP_URL=http://test-setup:8100
export K6_PS_VUS=50
export K6_PS_ITERATIONS=2
export K6_SETUP_TOTAL_USERS=250
export TEST_SETUP_CALL_ID=54
export K6_TEST_PARALLELISM=2
export K6_TEST_NAME="$K6_TEST_FILE-$(date +%s)"
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
k8s_config_dir="$(dirname $(realpath $0))"

echo "Removing previous test setup ..."
kubectl delete deployment/test-setup-deployment  -n apps  --ignore-not-found &> /dev/null
kubectl wait pods -l app=test-setup -n apps --timeout=-60s --for=delete &> /dev/null

sleep 5

echo "Removing previous k6 test $K6_TEST_FILE ..."
envsubst < $k8s_config_dir/resources/basic-test.yaml | kubectl delete -f - -n apps --ignore-not-found 1> /dev/null
kubectl delete configmap test-scripts -n apps --ignore-not-found

sleep 5

if [ "$SETUP_TEST_USERS" == "true" ]; then
  echo "Starting new load test setup ..."
  envsubst < $k8s_config_dir/kubernetes/test-setup/deployment.yaml | kubectl apply -f - -n apps 1> /dev/null
  kubectl apply -f $k8s_config_dir/kubernetes/test-setup/service.yaml 1> /dev/null
  kubectl wait deployment/test-setup-deployment  -n apps  --timeout=120s --for condition=Available=True 1> /dev/null
fi

sleep 5

echo "Add load test configmap ..."
kubectl create configmap test-scripts -n apps  --from-file=$k8s_config_dir/test/$K6_TEST_FILE.js

sleep 5

echo "Start load test ..."
envsubst < $k8s_config_dir/resources/basic-test.yaml | kubectl apply -f - -n apps 1> /dev/null

k6_pod_runners=0
attempts=1
while [[ $k6_pod_runners -le 1 && $attempts -le 10 ]]; do
  k6_pod_runners=$(kubectl get pods -o json -n apps | jq '.items[] | select(.metadata.labels["app"] == "k6" and .metadata.labels["runner"] == "true") | .status.phase' | grep -c "Running")
  echo "Number of k6 pod runners: $k6_pod_runners  attempt: $attempts"

  if [[ $k6_pod_runners -gt 1 ]]; then
    break
  fi

  echo "Waiting for k6 pod runners ..."
  attempts=$((attempts + 1))
  sleep 10
done

if [[ $k6_pod_runners -gt 1 ]]; then
  echo "k6 pod runners greater than one proceeding ..."
else
  echo "Could not initilise k6 pod runners after 10 attempts. Aborting."
  envsubst < $k8s_config_dir/resources/basic-test.yaml | kubectl delete -f - -n apps --ignore-not-found 1> /dev/null
  kubectl delete configmap test-scripts -n apps --ignore-not-found
  echo "Removing test setup"
  kubectl delete deployment/test-setup-deployment -n apps  &> /dev/null
  kubectl wait pods -l app=test-setup -n apps --timeout=-1s --for=delete &> /dev/null
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
  kubectl wait pods -l app=test-setup -n apps --timeout=-1s --for=delete &> /dev/null
fi

echo "k6 test failed $k6_pod_runners_failed "
echo "k6 test successful $k6_pod_runners_succeeded"
if [[ $k6_pod_runners_failed -gt 0 ]]; then
  echo "k6 test failed."
  envsubst < $k8s_config_dir/resources/basic-test.yaml | kubectl delete -f - -n apps --ignore-not-found 1> /dev/null
  kubectl delete configmap test-scripts -n apps --ignore-not-found
  exit 1
else
  echo "K6 tests where successful"
  envsubst < $k8s_config_dir/resources/basic-test.yaml | kubectl delete -f - -n apps --ignore-not-found 1> /dev/null
  kubectl delete configmap test-scripts -n apps --ignore-not-found
  exit 0
fi

