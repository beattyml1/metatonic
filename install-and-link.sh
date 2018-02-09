#!/bin/sh

echo 
echo -- Installing globals --
npm install -g jest

cd metatonic-core
echo
echo --- Starting Install metatonic-core --
npm install
npm link
echo 
cd .. 

cd metatonic-react
echo
echo -- Starting Install metatonic-react
npm link metatonic-core
npm install 
echo
cd ..
