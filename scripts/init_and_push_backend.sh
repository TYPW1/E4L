#!/bin/bash

# Variables
GITLAB_URL="http://192.168.56.10/gitlab/"
PROJECT_PATH="/back"
GIT_USER_NAME="typw01"
GIT_USER_EMAIL="typw@typw.com"
GIT_REMOTE_REPO="http://typw01:Pierr01999.@192.168.56.10/gitlab/typw01/lu.uni.e4l.platform.api.dev.git"

# Check if /back directory exists
if [ ! -d "$PROJECT_PATH" ]; then
    echo "The directory $PROJECT_PATH does not exist on the target machine."
    exit 1
fi

# Initialize Git repository
cd "$PROJECT_PATH"
git init

# Create .gitignore file if it doesn't exist
GITIGNORE_FILE="$PROJECT_PATH/.gitignore"
if [ ! -f "$GITIGNORE_FILE" ]; then
    cat <<EOF > "$GITIGNORE_FILE"
# Binaries
target/

# Log files
*log

# Dev settings
.settings
EOF
fi

# Configure Git user
git config --global user.name "$GIT_USER_NAME"
git config --global user.email "$GIT_USER_EMAIL"

# Configure credential storage
git config --global credential.helper store

# Add remote repository if it doesn't exist
if ! git remote | grep -q origin; then
    git remote add origin "$GIT_REMOTE_REPO"
else
    git remote set-url origin "$GIT_REMOTE_REPO"
fi

# Add and commit changes
git add --all
echo "Enter a commit message:"
read COMMIT_MESSAGE
git commit -m "$COMMIT_MESSAGE"

# Push to GitLab
git push -u origin master
