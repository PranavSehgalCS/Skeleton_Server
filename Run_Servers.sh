#!/bin/sh
#///////////////////////////////////////////////////////////////////////////////////////////////////////
#   FILE : Run_Servers.sh
#   AUTHOR : Pranav Sehgal
#   DESCRIPTION :   OPENS Postgress via Terminal so you can start DB
#                   OPENS a Terminal window and launches backend using mvn compile exec:java;
#		    CLEARS Angular Cache from previous session
#                   OPENS a Terminal window and launches fronted using ng serve --open;
#///////////////////////////////////////////////////////////////////////////////////////////////////////

osascript -e 'tell application "Terminal" to do script "cd Desktop/P3/Skeleton_Server/Project_API;
source ~/.bashrc;
title backend_marked_for_deletion;
mvn compile exec:java;mvn compile exec:java;"'


cd Desktop/P3F/Skeleton_Server/Project_UI/angular-workspace/
rm -r .angular/cache;

sleep 1;

osascript -e 'tell application "Terminal" to do script "cd Desktop/P3/Skeleton_Server/Project_UI/angular-workspace; 
source ~/.bashrc;
title frontend_marked_for_deletion;
ng serve --open;"'
