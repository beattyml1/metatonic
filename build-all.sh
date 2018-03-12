#!/bin/sh
cd metatonic-core
echo
echo
echo -- Starting build and test metatonic-core --
npm run cover 
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
npm run cover 
testresult=$?
if [ $testresult -ne 0 ]
then
   echo test failed
   exit $testresult
fi
cd ..
echo

echo 
echo
echo -- Metatonic Build Complete --
