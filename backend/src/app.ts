let process = require('process');
import express from 'express';
var multer  = require('multer')
const storage = multer.diskStorage({
  destination: function(req:any, file:any,cb:any){
    cb(null, './uploads/');
  },
  filename: function(req:any,file:any,cb:any){
    console.log(file)
    cb(null, new Date().getTime().toFixed() + file.originalname)
  }
});
var upload = multer({storage:storage })
var bodyParser = require('body-parser')
var cors = require('cors');
import {teamHandler} from "./TeamHandler";
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
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 5000;

const csConfig:CsConfig = new CsConfig();

fileDb.getTeams()
  .then((teams:Team[]) => teamHandler.addTeams(teams))
  .catch((err) => {
    console.log(err)
    process.exit();
  })

app.post('/profile/', upload.single('avatar'), (req, res) => {
  console.log(req.file)
  res.sendStatus(200);
})

function broadCast(type: string, data: any){
  console.log("Broadcasting: " + JSON.stringify({type:type, data:data}))
  wss.clients.forEach(client => {
    client.send(JSON.stringify({type:type, data:data}));
  })
}

app.get('/config/cs/active_teams', (req,res) => {
  console.log("Retrieving active teams")
  res.send(JSON.stringify({success:true,data:{a:csConfig.activeTeamA, b:csConfig.activeTeamB}}));
});

app.put('/config/cs/active_teams', (req,res) => {
  console.log("Setting active teams")
  let msg = req.body;
  console.log(msg);
  if(msg["a"] !== undefined){
    console.log("Updating active cs team A with " + msg.a)
    csConfig.activeTeamA = msg.a
  }
  if(msg["b"] !== undefined){
    console.log("Updating active cs team B with " + msg.b)
    csConfig.activeTeamB = msg.b
  }
  console.log("A: " + csConfig.activeTeamA)
  console.log("B: " + csConfig.activeTeamB)
  broadCast("CS_ACTIVE_TEAMS", JSON.stringify({a:csConfig.activeTeamA, b:csConfig.activeTeamB}));
  res.sendStatus(200);
})

app.get("/teams", (req,res) => {
  res.send({
    "type" : "teams",
    "data" : teamHandler.allTeams
  })
});

app.put("/teams/add", (req,res) => {
  let msg = req.body;
  console.log("Got new team..." + JSON.stringify(msg))
  //TODO: validate message Body
  let team:Team|undefined = teamHandler.addTeam(msg);
  console.log(JSON.stringify(team));
  res.send(team !== undefined?{succes : true} : {success : false});
  if(team !== undefined) broadCast("TEAM_ADDED", JSON.stringify(team));
});


wss.on('connection', (ws: WebSocket) => {
  console.log("New Connection")
  ws.on('message', (message: string) => {
      console.log('received: %s', message);
      ws.send(JSON.stringify({success: true}));
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

process.on( "SIGINT", function() {
  console.log("Shutting down, storing teams...")
  fileDb.storeTeams(teamHandler.allTeams);
} );