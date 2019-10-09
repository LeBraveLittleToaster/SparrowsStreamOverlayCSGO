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
    console.log("new Subscriber")
    console.log("Sending gameconfig: " + JSON.stringify(gameConfig.getJsonResponse()))
    ws.send(JSON.stringify({ type: "init", data: gameConfig.getJsonResponse() }));
    ws.on('message', function incoming(message) {
        let data = JSON.parse(message);
        console.log(data)
        if (data.type === "maps_update") {
            gameConfig.setMapData(data);
            broadcastGameConfigChange(data);
        } else if (data.type === "teamnames_update") {
            gameConfig.setTeamNames(data);
            broadcastTeamnnames(data);
        } else if(data.type === "timer_update"){
            broadcastTimerChange(data);
        }
    });
});

function broadcastGameConfigChange(changeJson) {
    console.log("Broadcasting change: " + JSON.stringify(changeJson));
    changeJson.type = "broadcast_" + changeJson.type;
    console.log("ChangeJSON: " + JSON.stringify(changeJson));
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(changeJson));
        }
    });
}

function broadcastTimerChange(timerJson){
    console.log("Broadcasting change: " + JSON.stringify(timerJson));
    timerJson.type = "broadcast_" + timerJson.type;
    console.log("TimerJSON: " + JSON.stringify(timerJson));
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(timerJson));
        }
    });
}

function broadcastTeamnnames(teamnamesJson){
    console.log("Broadcasting change: " + JSON.stringify(teamnamesJson));
    teamnamesJson.type = "broadcast_" + teamnamesJson.type;
    console.log("teamnamesJson: " + JSON.stringify(teamnamesJson));
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(teamnamesJson));
        }
    });
}

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

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post("/", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log("Handling payload")
    let rsps = eventHandler.checkAndHandleEvents(JSON.parse(req.body.toString()))
    broadcastGameEvents(rsps)
});

app.listen(port, () => {
    console.log("Opening server...");
})


console.log('Monitoring CS:GO rounds');