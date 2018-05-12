#!/bin/sh

echo 
echo -- Installing globals --
npm install -g jest
npm install -g typescript@2.8.3
npm install -g autopublish

npm install 

cd metatonic-core
echo
echo --- Starting Install metatonic-core --
rm -R node_modules
npm install
npm link
echo 
cd .. 

cd metatonic-react
echo
echo -- Starting Install metatonic-react
rm -R node_modules
npm install
rm -R node_modules/metatonic-core
npm link
npm link metatonic-core
echo
cd ..

cd metatonic-redux
echo
echo --- Starting Install metatonic-redux --
rm -R node_modules
npm install
npm link
rm -R node_modules/metatonic-core
npm link metatonic-core
echo
cd ..

cd metatonic-react-redux
echo
echo --- Starting Install metatonic-react-redux --
npm uninstall
npm install
npm link
rm -R node_modules/metatonic-core
rm -R node_modules/metatonic-react
rm -R node_modules/metatonic-redux
npm link metatonic-core
npm link metatonic-react
npm link metatonic-redux
echo
cd ..

cd metatonic-server
echo
echo --- Starting Install metatonic-server --
rm -R node_modules
npm install
rm -R node_modules/metatonic-core
npm link
npm link metatonic-core
echo
cd ..
