#!/bin/sh
#///////////////////////////////////////////////////////////////////////////////////////////////////////
#   FILE : Kill_Servers.sh
#   AUTHOR : Pranav Sehgal
#   DESCRIPTION :   CLEARS Terminal history (Currently Disabled)
#                   CLEARS Angualar Cache
#                   RUNS mvn clean; to clear target data;
#                   CLOSES all Terminal windows with name containing Run_Servers.sh
#                   CLOSES all Terminal windows with name containing marked_for_deletion 
#                   CLOSES all Terminal windows with name containing Kill_Servers.sh
#                   KILLS  all Terminal windows after 20 seconds(Currently Disabled)
#///////////////////////////////////////////////////////////////////////////////////////////////////////

a=1;

#history -c;


cd Desktop/P3/Skeleton_Server_SQL/Project_UI/angular-workspace/;
rm -r .angular/cache;
echo “\nAngular cache removed {Current Session} ”;

sleep 0.25;

cd;
cd Desktop/P3/Skeleton_Server_SQL/Project_API/;
mvn clean;

sleep 1;

osascript -e 'tell application "Terminal" to close (every window whose name contains "Run_Servers.sh")' &
osascript -e 'tell application "Terminal" to close (every window whose name contains "marked_for_deletion")' &

sleep 0.5;

osascript -e 'tell application "Terminal" to close (every window whose name contains "Kill_Servers.sh")' &

#sleep 20;
#killall Terminal