#!/bin/bash

# Define paths to Vagrant environments
DEV_ENV_PATH="/home/typw/Downloads/Devops/Project/Dev_env"
STAG_ENV_PATH="/home/typw/Downloads/Devops/Project/Staging_env"

# Function to copy SSH key to a VM and update authorized_keys
distribute_key() {
    local env_path=$1
    local vm_hostname=$2

    cd "$env_path"
    vagrant up
    vagrant ssh -- -t "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cp /vagrant_data/id_rsa_group4.pub ~/.ssh/ && cat ~/.ssh/id_rsa_group4.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
    echo "SSH key distributed to $vm_hostname"
}

# Distribute SSH key to Dev and Staging environments
distribute_key "$DEV_ENV_PATH" "Dev Environment"
distribute_key "$STAG_ENV_PATH" "Staging Environment"

echo "SSH key distribution complete."
