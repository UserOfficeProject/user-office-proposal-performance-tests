#!/usr/bin/env bash

# Helper script for building and pushing docker images.

IMAGE_NAME=$1
VERSION_TAG=$2
BUILD_DIR=$3

TAG=$(echo "$BRANCH_NAME" | tr _ -)
docker build --no-cache --pull -t ghcr.io/isisbusapps/$IMAGE_NAME:$VERSION_TAG $BUILD_DIR 
docker push ghcr.io/isisbusapps/$IMAGE_NAME:$VERSION_TAG 