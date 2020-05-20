
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
const fs = require('fs');
const port = 4040;
const WebSocket = require('ws');

/**
 * Server setup start
 *  - creates data folder (if not exists)
 *  - copys default_data.json
 *  - ask for steam_api_key
 */
var default_data = require('./default_data.json');
var simple_data_base = default_data;
var dir = './data';
const path = './data/simple_data_base.json';
// - creates data folder (if not exists)

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("data folder mkdir");
} else {
    console.log("data folder already exists");
}

// - copys default_data.json
try {
    if (fs.existsSync(path)) {
        try {
            console.log("simple_data_base already exists");
            simple_data_base = JSON.parse(fs.readFileSync(path, 'utf8'))
        } catch (err) {
            console.error(err)
            process.exit(1)
        }
    } else {
        console.log("create simple_data_base with default_data.json ");
    }
} catch (err) {
    console.error(err)
    process.exit(1)
}

// TODO check if simple_data_base is valid
function save_simple_data_base() {
    console.log("simple_data_base save");
    fs.writeFileSync(path, JSON.stringify(simple_data_base, null, 4));
    send_to_subscription(JSON.stringify(simple_data_base));
}
save_simple_data_base()



// Middleware
app.use(function (req, res, next) {
    var d = new Date();
    var n = d.toISOString();
    console.log(`Time ${n}, ${req.url}`);
    next();
});


// REST API
app.get('/api/simple_data_base', function (req, res) {
    res.json(simple_data_base)
});

app.use(express.json());
app.post('/api/simple_data_base', function (req, res) {
    if (!req.is('application/json')) {
        console.log("no application/json")
        res.status(415)
        res.send("json only please")
    } else {
        simple_data_base = req.body;
        save_simple_data_base()
        res.end("yes");
    }
});


// Websocket 
app.ws('/api/simple_data_base/subscription', function (ws, req) {
    setInterval(function timeout() {
        if(ws.readyState === WebSocket.OPEN){
            ws.ping("heartbeat");
        }
    }, 20000);
    ws.send(JSON.stringify(simple_data_base))
    ws.on('message', function (msg) {
        var d = new Date();
        var n = d.toISOString();
        console.log(`Time ${n}, message: ${req.url}`);
        try {
            parsed = JSON.parse(msg);
            simple_data_base = parsed;
            save_simple_data_base();
        } catch (e) {
            console.log("message could not be parsed");
        }
    });
    console.log('socket', req.testing);
});


function send_to_subscription(msg) {
    var aWss = expressWs.getWss('/api/simple_data_base/subscription');
    aWss.clients.forEach(function (client) {
        client.send(msg);
    });
}


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
