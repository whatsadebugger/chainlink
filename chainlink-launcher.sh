#!/bin/bash -e

trap "kill -- -$$ 2>/dev/null || true" SIGINT SIGTERM EXIT

if [ "$SGX_SIMULATION" != yes ]; then
  /opt/intel/sgxpsw/aesm/aesm_service &
  aesm_pid=$!
fi

./chainlink $@ &
chainlink_pid=$!

while sleep 10; do
  if [ "$SGX_SIMULATION" != yes ]; then
    kill -0 $aesm_pid 2>/dev/null
  fi
  kill -0 $chainlink_pid 2>/dev/null
done