#!/usr/bin/env node

const fs=require('fs');

if(process.argv.length<3){
	console.log('Missing file name');
	return;
}

let buf=fs.readFileSync(process.argv[2]);
let bufptr=0;

let vertex,face;
let vertexDepth=0;
let vertexBytes=0;
let faceBytes=0;
let element='';
while(true){
	let tok='';
	while(true){
		let ach=String.fromCharCode(buf[bufptr++]);
		if(ach=='\n') break;
		tok=tok.concat(ach);
	}
	if(tok=='end_header'){
		console.log(tok);
		break;
	}
	let toks=tok.split(' ');
	if(toks[0]=='format'){
		if(toks[1].startsWith('binary')) toks[1]='ascii';
	}
	else if(toks[0]=='element'){
		element=toks[1];
		if(element=='vertex') vertex=Number(toks[2]);
		else if(element=='face') face=Number(toks[2]);
	}
	else if(toks[0]=='property'){
		if(toks[1]=='float'){
			vertexDepth++;
			vertexBytes+=4;
		}
		else if(toks[1]=='list'){
			if(toks[2]=='uchar') faceBytes++;
			else if(toks[2]=='uint') faceBytes+=4;
			if(toks[3]=='int') faceBytes+=12;
			else if(toks[3]=='uint') faceBytes+=12;
		}
	}
	console.log(toks.toString().replace(/,/g,' '));
}

let bufend=bufptr+vertex*vertexBytes;
let outbuf=[];
for(;bufptr<bufend;bufptr+=4){
	let val=buf.readFloatLE(bufptr);
	outbuf.push(val);
	if(outbuf.length>=vertexDepth){
		console.log(outbuf.toString().replace(/,/g,' '));
		outbuf=[];
	}
}
if(outbuf.length>0) console.log(outbuf.toString().replace(/,/g,' '));

bufend=bufptr+face*faceBytes;
outbuf=[];
ln=0;
for(;bufptr<bufend;bufptr+=faceBytes){
	let i=bufptr;
	if(faceBytes==13) outbuf.push(buf[i++]);
	else{
		outbuf.push(readUInt32LE(i));
		i+=4;
	}
	outbuf.push(buf.readUInt32LE(i));
	outbuf.push(buf.readUInt32LE(i+4));
	outbuf.push(buf.readUInt32LE(i+8));
	console.log(outbuf.toString().replace(/,/g,' '));
	outbuf=[];
}
if(outbuf.length>0) console.log(outbuf.toString().replace(/,/g,' '));
