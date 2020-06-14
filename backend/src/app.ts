let process = require('process');
import Utils from './Utils';
import express from 'express';
var multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, './uploads/');
  },
  filename: function (req: any, file: any, cb: any) {
    Utils.checkIfFilenameAlreadyExist(file.originalname, "./uploads/")
      .then(() => {
        cb(null, file.originalname);
        broadCast("PICTURE_UPLOAD", JSON.stringify({ pic_path: file.originalname }));
      })
      .catch((err: any) => {
        console.log("Name taken")
        cb(new Error("Name taken"))
      })
    console.log(file)
  }
});
var upload = multer({ storage: storage })
var bodyParser = require('body-parser')
var cors = require('cors');
import { teamHandler } from "./TeamHandler";
import * as http from 'http';
import * as WebSocket from 'ws';
import Team from './data/Team';
import CsConfig from './data/cs/CsConfig';
import { fileDb } from './filedb';

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
const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use('/res', express.static('uploads'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 5000;

const csConfig: CsConfig = new CsConfig();

fileDb.getTeams()
  .then((teams: Team[]) => teamHandler.addTeams(teams))
  .catch((err) => {
    console.log(err)
    process.exit();
  })
fileDb.loadPictureUrls();

app.post('/profile/', upload.single('avatar'), (req, res) => {
  console.log(req.file)
  res.send(200);
})

function broadCast(type: string, data: any) {
  console.log("Broadcasting: " + JSON.stringify({ type: type, data: data }))
  wss.clients.forEach(client => {
    client.send(JSON.stringify({ type: type, data: data }));
  })
}

app.get('/config/cs/score', (req,res) =>{
  console.log("Retrieving score")
  res.send(JSON.stringify({ success: true, data: { score_a: csConfig._score_a, score_b: csConfig._score_b } }));
});

app.get('/config/cs/active_teams', (req, res) => {
  console.log("Retrieving active teams")
  res.send(JSON.stringify({ success: true, data: { a: csConfig._teamAId, b: csConfig._teamBId } }));
});

app.get('/config/cs/caster', (req, res) => {
  console.log("Retrieving active teams")
  res.send(JSON.stringify({ success: true, data: { caster:csConfig._caster } }));
});

app.get("/config/cs/active_logos", (req, res) => {
  console.log("Retrieving active logos")
  res.send(JSON.stringify({
    success: true,
    data: {
      logo_orga_path_a: csConfig._logo_orga_path_a,
      logo_team_path_a: csConfig._logo_team_path_a,
      logo_orga_path_b: csConfig._logo_orga_path_b,
      logo_team_path_b: csConfig._logo_team_path_b
    }
  }));
})

app.put('/config/cs/score', (req,res) => {
  console.log("Setting caster");
  let msg = req.body;
  console.log(msg);
  if(msg["score_a"]){
    console.log("Updating scora_a to " + msg.score_a);
    csConfig._score_a = msg["score_a"];
  }
  if(msg["score_b"]){
    console.log("Updating score_b to " + msg.score_b);
    csConfig._score_b = msg["score_b"];
  }
  broadCast("CS_SCORE", JSON.stringify({ score_a:csConfig._score_a, score_b: csConfig._score_b}));
  res.send(200);
})

app.put('/config/cs/caster', (req,res) => {
  console.log("Setting caster");
  let msg = req.body;
  console.log(msg);
  if(msg["caster"]){
    console.log("Updating caster to " + msg.caster);
    csConfig._caster = msg["caster"];
  }
  broadCast("CS_CASTER", JSON.stringify({ caster: msg["caster"] }));
  res.send(200);
})

app.put('/config/cs/active_teams', (req, res) => {
  console.log("Setting active teams")
  let msg = req.body;
  console.log(msg);
  if (msg["a"] !== undefined) {
    console.log("Updating active cs team A with " + msg.a)
    csConfig._teamAId = msg.a
  }
  if (msg["b"] !== undefined) {
    console.log("Updating active cs team B with " + msg.b)
    csConfig._teamBId = msg.b
  }
  console.log("A: " + csConfig._teamAId)
  console.log("B: " + csConfig._teamBId)
  broadCast("CS_ACTIVE_TEAMS", JSON.stringify({ a: csConfig._teamAId, b: csConfig._teamBId }));
  res.send(200);
})

app.put('/config/cs/active_logos', (req, res) => {
  console.log("Setting active logos")
  let msg = req.body;
  console.log(msg)
  console.log("is_a present " + msg["is_a"] !== undefined);
  console.log("is_team present " + msg["is_team"] !== undefined )
  if (msg["is_a"] !== undefined && msg["is_team"] !== undefined ) {
    console.log("Setting path " + msg["pic_path"]);
    csConfig.setLogoPath(msg["is_a"], msg["is_team"], msg["pic_path"]);
  } else {
    console.log("Failed to set paths")
  }
  broadCast("CS_ACTIVE_LOGOS", JSON.stringify({
    logo_orga_path_a: csConfig._logo_orga_path_a,
    logo_team_path_a: csConfig._logo_team_path_a,
    logo_orga_path_b: csConfig._logo_orga_path_b,
    logo_team_path_b: csConfig._logo_team_path_b
  }));
  res.send(200);
})

app.get("/pictureUrls", (req, res) => {
  res.send({
    type: "picUrls",
    data: fileDb._pictureUrls
  })
})

app.get("/teams", (req, res) => {
  res.send({
    "type": "teams",
    "data": teamHandler.allTeams
  })
});

app.put("/teams/add", (req, res) => {
  let msg = req.body;
  console.log("Got new team..." + JSON.stringify(msg))
  //TODO: validate message Body
  let team: Team | undefined = teamHandler.addTeam(msg);
  console.log(JSON.stringify(team));
  res.send(team !== undefined ? { succes: true } : { success: false });
  if (team !== undefined) broadCast("TEAM_ADDED", JSON.stringify(team));
});


wss.on('connection', (ws: WebSocket) => {
  console.log("New Connection")
  ws.on('message', (message: string) => {
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
  console.log(`WS Server started on port ${(server.address() as WebSocket.AddressInfo).port}`);
});

process.on("SIGINT", function () {
  console.log("Shutting down, storing teams...")
  console.log(teamHandler.allTeams)
  fileDb.storeTeams(teamHandler.allTeams);
  app.listen().close();
  process.exit(0);
});