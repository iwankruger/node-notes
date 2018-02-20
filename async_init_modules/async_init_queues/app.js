const http = require('http');
const routes = require('./routes');
const asyncModule = require('./asyncModuleWrapper');

asyncModule.initialize(() => {
    console.log('Async module initialized');
});

http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/say') {
        return routes.say(req, res);
    }
    res.writeHead(404);
    res.end('Not found');
}).listen(8000, () => console.log('Started'));

// Init asynch module
// Started
// Async module initialized

// http://localhost:8000/say
// I say: Current time is: Tue Feb 20 2018 11:59:04 GMT+0200 (South Africa Standard Time)