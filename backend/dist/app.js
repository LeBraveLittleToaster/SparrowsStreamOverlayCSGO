"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let process = require('process');
const express_1 = __importDefault(require("express"));
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, new Date().getTime().toFixed() + file.originalname);
    }
});
var upload = multer({ storage: storage });
var bodyParser = require('body-parser');
var cors = require('cors');
const TeamHandler_1 = require("./TeamHandler");
const http = __importStar(require("http"));
const WebSocket = __importStar(require("ws"));
const CsConfig_1 = __importDefault(require("./data/cs/CsConfig"));
const filedb_1 = require("./filedb");
/**
 * Each request message is:
 * {
 *  "type" : "someType",
 *  "data" : {
 *    "some specific obj"
 *    }
 * }
 *
 * * Each response message is:
 * {
 *  "success" : "true",
 *  "data" : {},
 *  "error" : {
 *    "some specific obj or null"
 *    }
 * }
 */
const app = express_1.default();
app.use(bodyParser.json());
app.use(cors());
app.use('/res', express_1.default.static('uploads'));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 5000;
const csConfig = new CsConfig_1.default();
app.post('/profile/', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    res.sendStatus(200);
});
function broadCast(type, data) {
    console.log("Broadcasting: " + JSON.stringify({ type: type, data: data }));
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ type: type, data: data }));
    });
}
app.get('/config/cs/active_teams', (req, res) => {
    console.log("Retrieving active teams");
    res.send(JSON.stringify({ success: true, data: { a: csConfig.activeTeamA, b: csConfig.activeTeamB } }));
});
app.put('/config/cs/active_teams', (req, res) => {
    console.log("Setting active teams");
    let msg = req.body;
    console.log(msg);
    if (msg["a"] !== undefined) {
        console.log("Updating active cs team A with " + msg.a);
        csConfig.activeTeamA = msg.a;
    }
    if (msg["b"] !== undefined) {
        console.log("Updating active cs team B with " + msg.b);
        csConfig.activeTeamB = msg.b;
    }
    console.log("A: " + csConfig.activeTeamA);
    console.log("B: " + csConfig.activeTeamB);
    broadCast("CS_ACTIVE_TEAMS", JSON.stringify({ a: csConfig.activeTeamA, b: csConfig.activeTeamB }));
    res.sendStatus(200);
});
app.get("/teams", (req, res) => {
    res.send({
        "type": "teams",
        "data": TeamHandler_1.teamHandler.allTeams
    });
});
app.put("/teams/add", (req, res) => {
    let msg = req.body;
    console.log("Got new team..." + JSON.stringify(msg));
    //TODO: validate message Body
    let team = TeamHandler_1.teamHandler.addTeam(msg);
    console.log(JSON.stringify(team));
    res.send(team !== undefined ? { succes: true } : { success: false });
    if (team !== undefined)
        broadCast("TEAM_ADDED", JSON.stringify(team));
});
wss.on('connection', (ws) => {
    console.log("New Connection");
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(JSON.stringify({ success: true }));
    });
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`HTTP server is listening on ${port}`);
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`WS Server started on port ${server.address().port}`);
});
process.on("SIGINT", function () {
    console.log("Shutting down, storing teams...");
    filedb_1.fileDb.storeTeams(TeamHandler_1.teamHandler.allTeams);
});
//# sourceMappingURL=app.js.map