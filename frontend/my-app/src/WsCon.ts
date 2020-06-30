import { teamStore } from "./TeamStore";
import Team from "./data/Team";
import { pictureStore } from "./PictureStore";
import { csStore } from "./CsStore";
import { settingsStore } from "./SettingsStore";

const URL = 'ws://localhost:8999'
class WsCon {
    ws = new WebSocket(URL);

    connect(): Promise<unknown> {
        this.ws.onopen = () => {
            console.log('connected')
        }

        this.ws.onmessage = evt => {
            console.log("received: %s", evt.data)
            const message = JSON.parse(evt.data)
            switch (message.type) {
                case "TEAM_ADDED":
                    this.addTeamToStore(JSON.parse(message.data));
                    break;
                case "CS_ACTIVE_TEAMS":
                    this.setActiveTeams(JSON.parse(message.data));
                    break;
                case "CS_ACTIVE_LOGOS":
                    this.setActiveLogos(JSON.parse(message.data));
                    break;
                case "CS_ACTIVE_SPONSORS":
                    this.setActiveSponsorLogos(JSON.parse(message.data));
                    break;
                case "PICTURE_UPLOAD":
                    this.addPicPath(JSON.parse(message.data));
                    break;
                case "CS_CASTER":
                    this.setCaster(JSON.parse(message.data));
                    break;
                case "CS_SCORE":
                    this.setScore(JSON.parse(message.data));
                    break;
                case "CS_LOGO_POS":
                    this.setLogoPos(JSON.parse(message.data));
                    break;
                case "SETTING_IS_DROPPING_TEAMS":
                    this.setSettingIsDroppingTeams(JSON.parse(message.data));
                    break;
                case "TEAM_B_COLOR_RAMP":{
                    this.setTeamBColorRampIndex(JSON.parse(message.data));
                    break;
                }
            }
        }

        this.ws.onclose = () => {
            console.log('disconnected')
        }
        return new Promise(resolve => { setTimeout(resolve, 3000) })
    }

    send(type: string, dataJson: string) {
        this.ws.send(JSON.stringify({ type: type, data: dataJson }));
    }

    addTeamToStore(msg: any) {
        if (msg["name"] && msg["_teamId"]) {
            teamStore.addTeam(new Team(msg._teamId, msg.name, msg.logo_orga_path, msg.logo_team_path))
            console.log("Added new team to store")
        } else {
            console.log("Failed to team: " + JSON.stringify(msg))
        }
    }

    setActiveTeams(msg: any) {
        if (msg["a"]) {
            teamStore.team_a_id = msg["a"]
        }
        if (msg["b"]) {
            teamStore.team_b_id = msg["b"]
        }
    }

    setActiveLogos(msg: any) {
        teamStore.logo_orga_path_a = msg["logo_orga_path_a"]
        teamStore.logo_team_path_a = msg["logo_team_path_a"]
        teamStore.logo_orga_path_b = msg["logo_orga_path_b"]
        teamStore.logo_team_path_b = msg["logo_team_path_b"]
    }

    setActiveSponsorLogos(msg: any) {
        if (msg["logo_paths"] !== undefined) {
            teamStore.sponsor_logo_paths = msg["logo_paths"];
        }
    }

    addPicPath(msg: any) {
        if (msg["pic_path"]) {
            pictureStore.picUrls.push(msg["pic_path"]);
        }
    }

    setCaster(msg: any) {
        if (msg["caster"]) {
            teamStore.caster = msg["caster"];
        }
    }

    setScore(msg: any) {
        if (msg["score_a"]) {
            csStore.score_a = msg["score_a"]
        } else {
            csStore.score_a = 0;
        }
        if (msg["score_b"]) {
            csStore.score_b = msg["score_b"]
        } else {
            csStore.score_b = 0;
        }
    }
    setLogoPos(msg:any){
        if(msg !== undefined){
            settingsStore.sponsor_logo_position = msg
        }
    }

    setSettingIsDroppingTeams(msg:any){
        if(msg !== undefined){
            settingsStore.isDroppingTeamsOnClose = msg;
        }
    }

    setTeamBColorRampIndex(msg:any){
        if(msg !== undefined){
            teamStore.team_b_color_ramp_index = msg;
        }
    }
}

export const wsCon = new WsCon();