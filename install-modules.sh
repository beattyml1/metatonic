#!/bin/sh

npm install

cd metatonic-core
echo
echo --- Starting Install metatonic-core --
rm -R node_modules
npm install
echo
cd ..

cd metatonic-react
echo
echo -- Starting Install metatonic-react
rm -R node_modules
npm install
echo
cd ..

cd metatonic-redux
echo
echo --- Starting Install metatonic-redux --
rm -R node_modules
npm install
echo
cd ..

cd metatonic-react-redux
echo
echo --- Starting Install metatonic-react-redux --
npm uninstall
npm install
echo
cd ..

cd metatonic-server
echo
echo --- Starting Install metatonic-server --
rm -R node_modules
npm install
echo
cd ..

cd metatonic-theme
echo
echo --- Starting Install metatonic-themes --
ls
rm -R node_modules
npm install
echo
cd ..
