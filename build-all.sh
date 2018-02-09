#!/bin/sh
cd metatonic-core
echo
echo
echo -- Starting build and test metatonic-core --
npm test
echo
cd ..

cd metatonic-react
echo
echo
echo -- Starting build and test metaonic-react --
npm test
cd ..
echo

echo -- Metatonic Build Complete --
