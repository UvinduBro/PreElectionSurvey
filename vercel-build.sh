#!/bin/bash

# Install dependencies
npm install

# Build the client
vite build

# Build the server
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist