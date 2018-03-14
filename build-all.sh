#!/bin/sh
cd metatonic-core
echo
echo
echo -- Starting build  metatonic-core --
tsc
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
echo -- Starting build  metaonic-react --
tsc
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
