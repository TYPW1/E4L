#!/bin/bash

echo "Verifying Java installation..."
java -version || { echo "Java verification failed"; exit 1; }

echo "Verifying MySQL installation..."
mysql --version || { echo "MySQL verification failed"; exit 1; }

echo "Verifying Node.js installation..."
node --version || { echo "Node.js verification failed"; exit 1; }

echo "Verifying gitlab installation..."
gitlab --version || { echo "gitlab verification failed"; exit 1; }

echo "All verifications passed!"
