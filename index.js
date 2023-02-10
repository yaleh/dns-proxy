const dns = require('native-dns');
const server = dns.createServer();
const args = require('minimist')(process.argv.slice(2));
const ipaddr = require('ipaddr.js');

const forwardDns = args.dns || '8.8.8.8';
const cidrRange = args.cidr || '240e:3a0::/28';
const domainName = args.domain || '.example.com';
const port = args.port || 53;

server.on('request', (request, response) => {
  const question = request.question[0];

  const proxy = dns.Request({
    question,
    server: { address: forwardDns, port: 53, type: 'udp' },
    timeout: 1000,
  });

  proxy.on('message', (err, msg) => {
    msg.answer.forEach(answer => {
      if (answer.name.endsWith(domainName) && answer.type === dns.consts.NAME_TO_QTYPE.AAAA) {
        const address = ipaddr.IPv6.parse(answer.address);
        const cidr = ipaddr.IPv6.parseCIDR(cidrRange);
        if (address.match(cidr)) {
          return;
        }
      }

      response.answer.push(answer);
    });

    response.send();
  });

  proxy.send();
});

server.on('error', (err, buff, req, res) => {
  console.error(err.stack);
});

server.serve(port);
