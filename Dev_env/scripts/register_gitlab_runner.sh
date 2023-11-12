#!/bin/bash

# GitLab instance URL
GITLAB_URL="http://192.168.56.10/gitlab/"

# Prompt for the GitLab Runner registration token
echo "Please enter the GitLab Runner registration token:"
read REGISTRATION_TOKEN

# Register the GitLab Runner
sudo gitlab-runner register --non-interactive \
  --url "$GITLAB_URL" \
  --registration-token "$REGISTRATION_TOKEN" \
  --description "[integration-server] docker" \
  --tag-list "integration" \
  --executor "docker" \
  --docker-image "alpine:latest" \
  --run-untagged="true" \
  --locked="false"

# Restart the GitLab Runner service
sudo gitlab-runner restart
