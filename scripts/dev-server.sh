#!/bin/env sh

set -e
echo "start-dev-server"


nodemon --watch ./server -e ts,tsx --exec ts-node-esm --experimental-specifier-resolution=node ./app.ts