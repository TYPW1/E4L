#!/bin/bash

# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -f id_rsa_group4 -N ""

# Move the keys to the shared folder
mv id_rsa_group4 /vagrant_data
mv id_rsa_group4.pub /vagrant_data