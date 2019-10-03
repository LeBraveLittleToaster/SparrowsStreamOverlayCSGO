const http = require('http');
const WebSocket = require('ws');
const EventHandler = require('./gameevents.js').EventHandler
const RoundEndEvent = require('./gameevents.js').RoundEndEvent
const CsgoGameConfig = require('./gameconfig.js').CsgoGameConfig

const port = 4000;
const host = '127.0.0.1';

let gameConfig = new CsgoGameConfig({});
let eventHandler = new EventHandler(gameConfig, [RoundEndEvent]);

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("New Suscriber connected")
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.clients.forEach(client => {
            client.send(Date.now().toString())
        })
    });
});

function broadcastGameEvents(rsps) {
    rsps.forEach((rsp) => {
        console.log("EVENT:" + rsp.getJsonResponse())
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(rsp.getJsonResponse());
            }
        });
    });
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let eventInfo = '';

    req.on('data', (data) => {
        console.log("Handling payload")
        let rsps = eventHandler.checkAndHandleEvents(JSON.parse(data.toString()))
        broadcastGameEvents(rsps)
    });

    req.on('end', () => {
        if (eventInfo !== '') {
            console.log(eventInfo);
        }

        res.end('');
    });
});



server.listen(port, host);

console.log('Monitoring CS:GO rounds');