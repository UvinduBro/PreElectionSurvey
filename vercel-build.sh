#!/bin/bash

# Install dependencies
npm install

# Build the client
npx vite build

# Build the server
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist