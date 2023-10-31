#!/bin/bash

# Variables
EMAIL="typw@typw.com"
GITLAB_REPO_SSH_URL="git@gitlab.com:typw01/e4l.git"
PROJECT_PATH="/path/to/your/project"

# Check for SSH key, generate if not exists
if [ ! -f ~/.ssh/id_rsa ]; then
    ssh-keygen -t rsa -b 4096 -C "$EMAIL" -N '' -f ~/.ssh/id_rsa
fi

# Start the ssh-agent and add the SSH key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# Copy the SSH key to clipboard (requires xclip)
xclip -sel clip < ~/.ssh/id_rsa.pub

# Output the SSH key
echo "Your SSH key has been copied to the clipboard."
echo "Please add it to your GitLab account."
cat ~/.ssh/id_rsa.pub

# Wait for user to confirm
read -p "Press Enter after you've added the SSH key to GitLab..."

# Initialize Git repository if it doesn't exist
if [ ! -d ".git" ]; then
    git init
fi

# Add the remote GitLab repository
git remote add gitlab "$GITLAB_REPO_SSH_URL"

# Add all files to the staging area
git add .

# Commit the changes
git commit -m "Initial commit"

# Determine the default branch name
DEFAULT_BRANCH=$(git branch --show-current)

# Push the changes to the GitLab repository
git push -u gitlab "$DEFAULT_BRANCH"

echo "Repository setup and push completed."
