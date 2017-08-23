const socks = require('socksv5');
const port = 1080;

const srv = socks.createServer((info, accept, deny) => {
  accept();
});

srv.listen(port, function() {
  console.log('SOCKS server listening on port ' + port);
});

srv.useAuth(socks.auth.UserPassword((user, password, cb) => {
  cb(user === 'nodejs' && password === 'works');
}));
