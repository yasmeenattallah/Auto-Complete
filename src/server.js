const http = require('http');
// eslint-disable-next-line no-unused-vars
const env = require('env2')('./src/server.env');
const router = require('./router');

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

const server = http.createServer(router);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server will run at http:// ${hostname} : ${port}`);
});
