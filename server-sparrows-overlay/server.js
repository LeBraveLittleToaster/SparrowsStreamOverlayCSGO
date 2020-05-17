
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

const port = 4040;


// Middleware
app.use(function (req, res, next) {
    var d = new Date();
    var n = d.toISOString();
    console.log(`Time ${n}, ${req.url}`);
    next();
});


// REST API
app.get('/api/hello', function (req, res) {
    res.send('Hello World!\n');
});


// Websocket 
app.ws('/api/syncservice', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
    });
    console.log('socket', req.testing);
});


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
