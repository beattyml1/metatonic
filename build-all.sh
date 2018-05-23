#!/bin/sh
echo
cd metatonic-core
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
echo -- Starting build  metatonic-react --
tsc
testresult=$?
if [ $testresult -ne 0 ]
then
   echo test failed
   exit $testresult
fi
cd ..
echo

cd metatonic-redux
echo -- Starting build  metatonic-redux --
tsc
testresult=$?
if [ $testresult -ne 0 ]
then
   echo test failed
   exit $testresult
fi
cd ..
echo


cd metatonic-react-redux
echo -- Starting build  metatonic-react-redux --
tsc
testresult=$?
if [ $testresult -ne 0 ]
then
   echo test failed
   exit $testresult
fi
cd ..
echo


cd metatonic-theme
echo -- Starting build  metatonic-themes --
npm run sass
testresult=$?
if [ $testresult -ne 0 ]
then
   echo test failed
   exit $testresult
fi
cd ..
echo

echo
echo -- Metatonic Build Complete --
