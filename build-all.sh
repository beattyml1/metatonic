#!/bin/sh
cd metatonic-core
echo
echo
echo -- Starting build and test metatonic-core --
npm run ci 
testresult=$?
if [ $testresult -ne 0 ]
then
   echo test failed
   exit $testresult
fi
echo
cd ..

cd metatonic-react
echo
echo
echo -- Starting build and test metaonic-react --
npm test
testresult=$?
if [ $testresult -ne 0 ]
then
   echo test failed
   exit $testresult
fi
cd ..
echo

echo -- Metatonic Build Complete --
