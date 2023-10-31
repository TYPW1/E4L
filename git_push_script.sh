#!/bin/bash

# Check if a Git repository needs to be initialized
if [ ! -d ".git" ]; then
    git init
fi

# Add the remote GitLab repository with a different name
git remote add gitlab http://192.168.56.10/gitlab/typw01/e4l.git

# Add all files to the staging area
git add .

# Commit the changes with a message
git commit -m "Initial commit"

# Determine the default branch name (master or main or any other)
DEFAULT_BRANCH=$(git branch --show-current)

# Push the commit to the GitLab repository on the default branch using the new remote name
git push -u gitlab $DEFAULT_BRANCH
