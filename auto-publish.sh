#!/bin/bash 

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" == "master" ]]; then
   echo 
   echo -- Checking whether there are NPM packages to publish
   cd metatonic-core
   autopublish
   cd ..
   cd metatonic-react
   autopublish
  cd ..
fi


