import express from 'express';
var bodyParser = require('body-parser')
var cors = require('cors');
import {teamHandler} from "./TeamHandler";
import * as http from 'http';
import * as WebSocket from 'ws';
import Team from './data/Team';
import CsConfig from './data/cs/CsConfig';

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
  //connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
      //log the received message and send it back to the client
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