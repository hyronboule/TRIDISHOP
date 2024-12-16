#!/bin/bash

# List of folders to run 'npm install'
folders=("client" "backend/admin" "backend/api-gateway" "backend/auth" "backend/products" "backend/profil" "backend/service" "backend/testApi")

echo "Starting dependency installation in each folder..."

# Save the initial directory (where the .sh file is located)
initial_dir=$(pwd)

# Loop through each folder
for folder in "${folders[@]}"; do
  if [ -d "$folder" ]; then
    echo "Entering $folder..."
    cd "$folder"
    echo "Current directory: $(pwd)"
    
    npm install

    # Go back to the initial directory
    cd "$initial_dir"
  else
    echo "The folder $folder does not exist. Skipping to the next one..."
  fi
done

echo "Dependency installation completed for all folders."
