const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message',(msg,rinfo)=>{
    console.log('Incoming MSG',msg.toString());
});

server.bind(53,()=>console.log ('DNS server is running on port 53'));