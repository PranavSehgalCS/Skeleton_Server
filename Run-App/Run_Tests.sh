#!/bin/sh
#///////////////////////////////////////////////////////////////////////////////////////////////////////
#   FILE : Run_Tests.sh
#   AUTHOR : Pranav Sehgal <PranavSehgalCS>
#   DESCRIPTION :   OPENS a Terminal window and starts tests via mvn test;
#///////////////////////////////////////////////////////////////////////////////////////////////////////


cd Desktop/P3/Skeleton_Server/Project_API
mvn surefire:test@model;
#mvn surefire:test@controller; 
mvn surefire:test@persistance;
echo "\n\n\n\n\n\n\n\n"

mvn jacoco:report@model;
#mvn jacoco:report@controller; 
mvn jacoco:report@persistance;

sleep 1;
echo "\n\n\n\n\n\n\n\n"

cd target