let process = require('process');
import Utils from './Utils';
import express from 'express';
var multer  = require('multer')
const storage = multer.diskStorage({
  destination: function(req:any, file:any,cb:any){
    cb(null, './uploads/');
  },
  filename: function(req:any,file:any,cb:any){
    Utils.checkIfFilenameAlreadyExist(file.originalname, "./uploads/")
      .then(() => cb(null, file.originalname))
      .catch((err:any) => {
        console.log("Name taken")
        cb(new Error("Name taken"))
      })
    console.log(file)
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
app.use('/res', express.static('uploads'));

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
fileDb.loadPictureUrls();

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
  res.send(JSON.stringify({success:true,data:{a:csConfig._teamAId, b:csConfig._teamBId}}));
});

app.put('/config/cs/active_teams', (req,res) => {
  console.log("Setting active teams")
  let msg = req.body;
  console.log(msg);
  if(msg["a"] !== undefined){
    console.log("Updating active cs team A with " + msg.a)
    csConfig._teamAId = msg.a
  }
  if(msg["b"] !== undefined){
    console.log("Updating active cs team B with " + msg.b)
    csConfig._teamBId = msg.b
  }
  console.log("A: " + csConfig._teamAId)
  console.log("B: " + csConfig._teamBId)
  broadCast("CS_ACTIVE_TEAMS", JSON.stringify({a:csConfig._teamAId, b:csConfig._teamBId}));
  res.sendStatus(200);
})

app.get("/pictureUrls", (req,res) => {
  res.send({
    type: "picUrls",
    data : fileDb._pictureUrls
  })
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
  console.log(teamHandler.allTeams)
  fileDb.storeTeams(teamHandler.allTeams);
  app.listen().close();
  process.exit(0);
} );