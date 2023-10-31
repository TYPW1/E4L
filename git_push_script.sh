#!/bin/bash

# Your GitLab credentials
GITLAB_USERNAME="typw01"
GITLAB_PASSWORD="Pierr01999."

# The URL of your GitLab repository (without credentials)
GITLAB_REPO_URL="http://192.168.56.10/gitlab/typw01/e4l.git"

# Encoded URL to include credentials
ENCODED_GITLAB_URL=$(echo $GITLAB_REPO_URL | sed "s://:://${GITLAB_USERNAME}:${GITLAB_PASSWORD}@:")

# Check if a Git repository needs to be initialized
if [ ! -d ".git" ]; then
    git init
fi

# Add the remote GitLab repository with a different name
git remote add gitlab $ENCODED_GITLAB_URL

# Add all files to the staging area
git add .

# Commit the changes with a message
git commit -m "Initial commit"

# Determine the default branch name (master or main or any other)
DEFAULT_BRANCH=$(git branch --show-current)

# Push the commit to the GitLab repository on the default branch using the new remote name
git push -u gitlab $DEFAULT_BRANCH
