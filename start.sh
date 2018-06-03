#!/bin/bash

if ! rosnode list | grep /tools_node
then
	rosrun rovi tools_node &
fi

if ! rosnode list | grep /pclgate
then
	./pclgate.js /tools/pcl &
fi

if ! ps ax | sed '/grep/d' | grep http-server
then
	http-server &
fi


echo Connect to "http://localhost:8080/pclv.html"
echo Enter PLY file name via rosservice as below
echo rosservice call /tools/plread scene.ply
