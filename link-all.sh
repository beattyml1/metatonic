#!/bin/sh

cd metatonic-core
echo
echo --- Linking metatonic-core --
npm link
echo
cd ..

cd metatonic-react
echo -- Linking metatonic-react --
rm -R node_modules/metatonic-core
npm link
npm link metatonic-core
echo
cd ..

cd metatonic-redux
echo --- Linking metatonic-redux --
npm link
rm -R node_modules/metatonic-core
npm link metatonic-core
echo
cd ..

cd metatonic-react-redux
echo
echo --- Linking metatonic-react-redux --
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
echo --- Linking metatonic-server --
rm -R node_modules/metatonic-core
npm link
npm link metatonic-core
echo
cd ..
