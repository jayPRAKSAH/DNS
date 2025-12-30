const dgram = require('dgram');
const dnsPacket = require('dns-packet');
const server = dgram.createSocket('udp4');

const db = {
    'example.com': {
        type: 'A',
        data: '1.2.3.4',
    },
     'normoon.com': {
        type: 'A',
        data: '2.2.4.4',
    },
    'test.com': {
        type: 'CNAME',
        data: 'hashnode.network',
    }
};

server.on('message', (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg);
    const domain = incomingReq.questions[0].name.replace(/\.$/, '');
    const record = db[domain];

    if (!record) {
        const res = dnsPacket.encode({
            type: 'response',
            id: incomingReq.id,
            flags: dnsPacket.AUTHORITATIVE_ANSWER,
            questions: incomingReq.questions,
            answers: [],
            rcode: 'NXDOMAIN'
        });
        server.send(res, rinfo.port, rinfo.address);
        return;
    }

    const response = dnsPacket.encode({
        type: 'response',
        id: incomingReq.id,
        flags: dnsPacket.RECURSION_DESIRED | dnsPacket.AUTHORITATIVE_ANSWER,
        questions: incomingReq.questions,
        answers: [{
            name: incomingReq.questions[0].name,
            type: record.type,
            class: 'IN',
            ttl: 300,
            data: record.data
        }]
    });

    server.send(response, rinfo.port, rinfo.address);
    console.log(`Answered ${domain} → ${record.data}`);
});

server.bind(53, () => {
    console.log('DNS server is running on port 53');
});
