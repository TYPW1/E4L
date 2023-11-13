#!/bin/bash

# Ensure the script is run from the project root
PROJECT_ROOT="$(dirname "$0")"
cd "$PROJECT_ROOT"

# Navigate to the Dev environment directory and launch it
cd Dev_env
vagrant up
vagrant provision
cd ..

# Navigate to the Staging environment directory and launch it
cd Staging_env
vagrant up
vagrant provision
cd ..

# Run the SSH key generation and distribution scripts
cd Dev_env/scripts
bash generate_ssh_keys.sh
bash distribute_ssh_keys.sh
cd ../..

echo "Setup completed!"