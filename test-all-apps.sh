#!/bin/sh

CI=true

cd apps

echo Testing App Builder
cd app-builder
./link.sh
CI=true npm test

cd ..

echo Testing Frontend Only Example App
cd frontend-only
./link.sh
CI=true npm test

cd ../..

