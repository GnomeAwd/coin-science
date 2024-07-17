#!/bin/bash

# Run npm command 1 in the background
cd web
pnpm install
pnpm run dev &


# Run npm command 2 in the background
cd ../backend
npm install
npm run dev &

# Wait for all background processes to complete
wait
