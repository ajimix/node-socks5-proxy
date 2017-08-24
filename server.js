const fs = require('fs');

if (!fs.existsSync('./config.json')) {
  return console.error('[ERROR] Please create config.json file first');
}

const socks = require('socksv5');
const config = require('./config.json');
const configPort = config.port || 1080;
const configUser = config.user || 'nodejs';
const configPass = config.pass || 'works';

const srv = socks.createServer((info, accept, deny) => {
  accept();
});

srv.listen(configPort, function() {
  console.log('SOCKS server listening on port: ' + configPort + ' user: ' + configUser + ' pass: ' + configPass);
});

srv.useAuth(socks.auth.UserPassword((user, password, cb) => {
  cb(user === configUser && password === configPass);
}));
