#!/bin/bash

# Initialize a new Git repository
git init

# Add the remote GitLab repository
git remote add origin http://192.168.56.10/gitlab/typw01/e4l.git

# Add all files to the staging area
git add .

# Commit the changes with a message
git commit -m "Initial commit"

# Push the commit to the GitLab repository on the master branch
git push -u origin master
