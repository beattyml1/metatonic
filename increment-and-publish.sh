#!/bin/sh

echo
cd metatonic-core
echo Incrementing Metatonic Core
npm version patch
echo Publishing Metatonic Core
npm publish
cd ..

echo
cd metatonic-react
echo Incrementing Metatonic React
npm version patch
echo updating dependencies
npm update --save metatonic-core
echo Publishing Metatonic React
npm publish
cd ..

echo
cd metatonic-redux
echo Incrementing Metatonic Redux
npm version patch
echo updating dependencies
npm update --save metatonic-core 
echo Publishing Metatonic Redux
npm publish
cd ..

echo
cd metatonic-react-redux
echo Incrementing Metatonic React Redux
npm version patch
echo updating dependencies
npm update --save metatonic-core
npm update --save metatonic-react
npm update --save metatonic-redux
echo Publishing Metatonic React Redux
npm publish
cd ..
