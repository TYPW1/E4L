#!/bin/bash

# Script to initialize and push both front-end and back-end projects to GitLab

# Paths to the scripts for backend and frontend
BACKEND_SCRIPT="init_and_push_backend.sh"
FRONTEND_SCRIPT="init_and_push_frontend.sh"

echo "Initializing and pushing back-end project..."
bash "$BACKEND_SCRIPT"

echo "Initializing and pushing front-end project..."
bash "$FRONTEND_SCRIPT"

echo "Both projects have been initialized and pushed successfully."
