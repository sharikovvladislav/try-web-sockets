const ws = require('nodejs-websocket');

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer((conn) => {
  let name = '';
  console.log('New connection');
  conn.on('text', (str) => {
    console.log(`Received ${str}, name is ${name}`);
    if (!name) {
      name = str;
      broadcast(`${name} присоединился к чату`);
    } else {
      broadcast(`${name}: ${str}`);
    }
  });
  conn.on('close', (code, reason) => {
    console.log('Connection closed');
  });
}).listen(8001);


function broadcast (msg) {
  server.connections.forEach(function (conn) {
    conn.sendText(msg);
  });
}
