const WebSocketServer = require('ws').Server;

//static file server
const server = require('http').createServer(
    require('ecstatic')({root: `${__dirname}/www`})
);

// create a new instance of the WebSocket server and
// attach it to our existing HTTP server
const wss = new WebSocketServer({server: server});

// start listening for incoming WebSocket connections, by
// attaching an event listener for the connection event.
wss.on('connection', ws => {
    console.log('Client connected');

    // Each time a new client connects to our server, we
    // start listening for incoming messages. When a new
    // message arrives, we broadcast it to all the
    // connected clients.
    ws.on('message', msg => {
        console.log(`Message: ${msg}`);
        broadcast(msg);
    });
});

function broadcast(msg) {
    // iteration over all the connected clients
    wss.clients.forEach(client => {
        client.send(msg);
    });
}

server.listen(process.argv[2] || 8080);