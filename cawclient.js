var WsShare=function(url,func){
	this.sock=new WebSocket(url);
	let urls=url.split(':');
	this.url=urls[0]+':'+urls[1];
	this.port=urls[2];
	let evptr=this;
	let evcb=arguments.length>=2? func:null;
//	window.onbeforeunload=function(){
//		evptr.sock.onclose();
//	}
	this.sock.onopen=function(){
		console.log(url+'/'+arguments.length+'/WS Initialize Success');
		if(evcb!=null) evcb(evptr);
	}
	this.sock.onmessage=function(event){
		console.log('WS message:'+event.data);
		evptr.set(JSON.parse(event.data));
	}
	this.sock.onerror=function(){
		console.log('WS Error!');
	}
	this.sock.onclose=function(){
		console.log('WS Connection Close!');
	}
}
WsShare.prototype={
	sock:null,url:null,port:0,
	send:function(str){
		let s=str;
		if(arguments.length==0) s=JSON.stringify(this);
		console.log('WSsend:'+s);
		this.sock.send(s);
	},
	sendObject:function(obj){
		let s=JSON.stringify(arguments.length>0? obj:this);
		this.send(s);
	},
	set:function(obj){
		for(let key in obj){
			let val=obj[key];
			if((typeof this[key])==='undefined'){
				console.log('WsShare.set undefined, so make it:'+key);
				this[key]=val;
			}
			else if((typeof this[key])==='function'){
				console.log('WsShare.set.call:'+key+'='+val);
				this[key](val);
			}
			else{
				console.log('WsShare.set.val:'+key+'='+val);
				this[key]=val;
			}
		}
	}
}
