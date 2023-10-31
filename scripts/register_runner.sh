#!/bin/bash

# Configuration Variables
GITLAB_URL="http://192.168.56.10/gitlab/"
RUNNER_TOKEN="YourGitlabRunnerTokenHere"
RUNNER_DESCRIPTION="[integration-server] docker"
RUNNER_TAGS="integration"
RUNNER_EXECUTOR="docker"
RUNNER_DOCKER_IMAGE="alpine:latest"
CHECK_USERNAME="typw01"

# Check for GitLab Runner Installation
if ! command -v gitlab-runner &> /dev/null
then
    echo "GitLab Runner is not installed. Exiting..."
    exit 1
fi

# Check if specified user exists
if ! id -u "$CHECK_USERNAME" &> /dev/null
then
    echo "Specified user '$CHECK_USERNAME' does not exist. Exiting..."
    exit 1
fi

# Check if Runner is Already Registered
if gitlab-runner list | grep -q "$RUNNER_DESCRIPTION"
then
    echo "Runner already registered."
else
    # Register the Runner
    echo "Registering the GitLab Runner..."
    gitlab-runner register \
        --non-interactive \
        --url "$GITLAB_URL" \
        --registration-token "$RUNNER_TOKEN" \
        --executor "$RUNNER_EXECUTOR" \
        --docker-image "$RUNNER_DOCKER_IMAGE" \
        --description "$RUNNER_DESCRIPTION" \
        --tag-list "$RUNNER_TAGS"
    
    if [ $? -eq 0 ]; then
        echo "Runner registered successfully."
    else
        echo "Failed to register the runner."
        exit 1
    fi
fi

exit 0
