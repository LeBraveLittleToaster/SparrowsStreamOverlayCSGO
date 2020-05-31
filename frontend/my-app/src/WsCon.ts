import {teamStore} from "./TeamStore";
import Team from "./data/Team";

const URL = 'ws://localhost:8999'
class WsCon {
    ws = new WebSocket(URL);

    connect():Promise<unknown>{
        this.ws.onopen = () => {
            console.log('connected')
        }

        this.ws.onmessage = evt => {
            console.log("received: %s", evt.data)
            const message = JSON.parse(evt.data)
            switch(message.type){
                case "TEAM_ADDED":
                    this.addTeamToStore(JSON.parse(message.data));
                    break;
                case "CS_ACTIVE_TEAMS":
                    this.setActiveTeams(JSON.parse(message.data));
                    break;
            }
        }

        this.ws.onclose = () => {
            console.log('disconnected')
        }
        return new Promise(resolve => {setTimeout(resolve,3000)})
    }

    send(type:string, dataJson:string){
        this.ws.send(JSON.stringify({type:type, data:dataJson}));
    }

    addTeamToStore(msg:any){
        if(msg["name"] && msg["id"]){
            teamStore.addTeam(new Team(msg.id,msg.name))
            console.log("Added new team to store")
        }else{
            console.log("Failed to team: " + JSON.stringify(msg))
        }
    }

    setActiveTeams(msg:any){
        if(msg["a"]){
            teamStore.team_a_id = msg["a"]
        }
        if(msg["b"]){
            teamStore.team_b_id = msg["b"]
        }
    }
}

export const wsCon = new WsCon();