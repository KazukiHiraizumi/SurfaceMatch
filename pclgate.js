#!/usr/bin/env node

const fs=require('fs');
const ws=require('ws');
const ros=require('rosnodejs');
const caws=require('./cawserver.js').listen(5000);
const sensor_msgs=ros.require('sensor_msgs').msg;

setImmediate(async function(){
	if(process.argv.length<3){
		ros.log.error('Missing target topic name to subscribe');
		return;
	}
	const rosNode=await ros.initNode('/plysvr');
	let sub=rosNode.subscribe(process.argv[2],sensor_msgs.PointCloud,async (pts)=>{
		let mat=new Float32Array(pts.points.length*3);
		for(let i=0;i<pts.points.length;i++){
			mat[3*i]=pts.points[i].x;
			mat[3*i+1]=pts.points[i].y;
			mat[3*i+2]=pts.points[i].z;
		}
		try{
			caws.sender.sendObject({port:5001});
			const sock=new ws.Server({port:5001});
			sock.on('connection',function(client){
				client.send(mat);
			});
		}
		catch(e){
			ros.log.error('ws send '+e);
		}
	});
});
