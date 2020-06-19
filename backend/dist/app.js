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
const args = require('minimist')(process.argv.slice(2));
const Utils_1 = __importDefault(require("./Utils"));
const express_1 = __importDefault(require("express"));
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        Utils_1.default.checkIfFilenameAlreadyExist(file.originalname, "./uploads/")
            .then(() => {
            cb(null, file.originalname);
            broadCast("PICTURE_UPLOAD", JSON.stringify({ pic_path: file.originalname }));
        })
            .catch((err) => {
            console.log("Name taken");
            cb(new Error("Name taken"));
        });
        console.log(file);
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
app.use('/sponsors', express_1.default.static('sponsors'));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 5000;
const csConfig = new CsConfig_1.default();
filedb_1.fileDb.getTeams()
    .then((teams) => TeamHandler_1.teamHandler.addTeams(teams))
    .catch((err) => {
    console.log(err);
    process.exit();
});
filedb_1.fileDb.loadPictureUrls();
filedb_1.fileDb.loadSponsorUrls();
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
app.get('/config/cs/score', (req, res) => {
    console.log("Retrieving score");
    res.send(JSON.stringify({ success: true, data: { score_a: csConfig._score_a, score_b: csConfig._score_b } }));
});
app.get('/config/cs/active_teams', (req, res) => {
    console.log("Retrieving active teams");
    res.send(JSON.stringify({ success: true, data: { a: csConfig._teamAId, b: csConfig._teamBId } }));
});
app.get('/config/cs/active_sponsor_logos', (req, res) => {
    console.log("Retrieving active sponsor logos");
    res.send(JSON.stringify({ success: true, data: { logo_paths: csConfig._sponsor_logo_paths } }));
});
app.get('/config/cs/caster', (req, res) => {
    console.log("Retrieving active teams");
    res.send(JSON.stringify({ success: true, data: { caster: csConfig._caster } }));
});
app.get("/config/cs/active_logos", (req, res) => {
    console.log("Retrieving active logos");
    res.send(JSON.stringify({
        success: true,
        data: {
            logo_orga_path_a: csConfig._logo_orga_path_a,
            logo_team_path_a: csConfig._logo_team_path_a,
            logo_orga_path_b: csConfig._logo_orga_path_b,
            logo_team_path_b: csConfig._logo_team_path_b
        }
    }));
});
app.put('/config/cs/score', (req, res) => {
    console.log("Setting caster");
    let msg = req.body;
    console.log(msg);
    if (msg["score_a"]) {
        console.log("Updating scora_a to " + msg.score_a);
        csConfig._score_a = msg["score_a"];
    }
    if (msg["score_b"]) {
        console.log("Updating score_b to " + msg.score_b);
        csConfig._score_b = msg["score_b"];
    }
    broadCast("CS_SCORE", JSON.stringify({ score_a: csConfig._score_a, score_b: csConfig._score_b }));
    res.sendStatus(200);
});
app.put('/config/cs/caster', (req, res) => {
    console.log("Setting caster");
    let msg = req.body;
    console.log(msg);
    if (msg["caster"]) {
        console.log("Updating caster to " + msg.caster);
        csConfig._caster = msg["caster"];
    }
    broadCast("CS_CASTER", JSON.stringify({ caster: msg["caster"] }));
    res.sendStatus(200);
});
app.put('/config/cs/active_teams', (req, res) => {
    console.log("Setting active teams");
    let msg = req.body;
    console.log(msg);
    if (msg["a"] !== undefined) {
        console.log("Updating active cs team A with " + msg.a);
        csConfig._teamAId = msg.a;
    }
    if (msg["b"] !== undefined) {
        console.log("Updating active cs team B with " + msg.b);
        csConfig._teamBId = msg.b;
    }
    console.log("A: " + csConfig._teamAId);
    console.log("B: " + csConfig._teamBId);
    broadCast("CS_ACTIVE_TEAMS", JSON.stringify({ a: csConfig._teamAId, b: csConfig._teamBId }));
    res.sendStatus(200);
});
app.put('/config/cs/active_logos', (req, res) => {
    console.log("Setting active logos");
    let msg = req.body;
    console.log(msg);
    if (msg["is_a"] !== undefined && msg["is_team"] !== undefined) {
        console.log("Setting path " + msg["pic_path"]);
        csConfig.setLogoPath(msg["is_a"], msg["is_team"], msg["pic_path"]);
    }
    else {
        console.log("Failed to set paths");
    }
    broadCast("CS_ACTIVE_LOGOS", JSON.stringify({
        logo_orga_path_a: csConfig._logo_orga_path_a,
        logo_team_path_a: csConfig._logo_team_path_a,
        logo_orga_path_b: csConfig._logo_orga_path_b,
        logo_team_path_b: csConfig._logo_team_path_b
    }));
    res.sendStatus(200);
});
app.put('/config/cs/active_sponsor_logos', (req, res) => {
    console.log("Setting active sponsors");
    let msg = req.body;
    console.log(msg);
    if (msg["logo_path"] !== undefined) {
        csConfig.addOrRemoveIfPresentAndGetActiveSponsor(msg["logo_path"]);
    }
    else {
        csConfig._sponsor_logo_paths = [];
    }
    broadCast("CS_ACTIVE_SPONSORS", JSON.stringify({
        logo_paths: csConfig._sponsor_logo_paths
    }));
    res.sendStatus(200);
});
app.get("/teams/dropOnClose", (req, res) => {
    res.send({
        type: "dropOnClose",
        data: filedb_1.fileDb._dropTeamsOnClose
    });
});
app.put("/teams/dropOnClose", (req, res) => {
    if (req.body.dropTeamsOnClose !== undefined)
        filedb_1.fileDb._dropTeamsOnClose = req.body.dropTeamsOnClose;
    broadCast("SETTING_IS_DROPPING_TEAMS", req.body.dropTeamsOnClose);
    res.sendStatus(200);
});
app.get("/sponsorUrls", (req, res) => {
    res.send({
        type: "sponsorUrls",
        data: filedb_1.fileDb._sponsorUrls
    });
});
app.get("/pictureUrls", (req, res) => {
    res.send({
        type: "picUrls",
        data: filedb_1.fileDb._pictureUrls
    });
});
app.get("/teams", (req, res) => {
    res.send({
        "type": "teams",
        "data": TeamHandler_1.teamHandler.allTeams
    });
});
app.get("/setting/logoPos", (req, res) => {
    res.send({
        "type": "logo_pos",
        "data": csConfig._sponsor_logo_pos
    });
});
app.put("/setting/logoPos", (req, res) => {
    let msg = req.body;
    console.log("Got new team..." + JSON.stringify(msg));
    if (msg["logo_pos"] !== undefined) {
        csConfig._sponsor_logo_pos = msg["logo_pos"];
    }
    broadCast("CS_LOGO_POS", msg["logo_pos"]);
    res.sendStatus(200);
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
    ws.on('message', (message) => {
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
    console.log(TeamHandler_1.teamHandler.allTeams);
    if (!filedb_1.fileDb._dropTeamsOnClose) {
        filedb_1.fileDb.storeTeams(TeamHandler_1.teamHandler.allTeams);
        console.log("Storing teams");
    }
    else {
        console.log("Dropping teams");
    }
    app.listen().close();
    process.exit(0);
});
//# sourceMappingURL=app.js.map