import {observable} from 'mobx';
import Team from "./data/Team";

class TeamStore {
    @observable teams:Team[] = [];
    @observable team_a_id:string = "";
    @observable team_b_id:string = "";
    @observable logo_orga_path_a: string|undefined = undefined;
    @observable logo_orga_path_b: string|undefined = undefined;
    @observable logo_team_path_a: string|undefined = undefined;
    @observable logo_team_path_b: string|undefined = undefined;
    @observable caster: string|undefined = undefined;
    @observable sponsor_logo_paths: string[] = [];

    getTeamWithId(teamId:string):Team|undefined{
        console.log("TeamId: " + teamId + " | TEAMS:"); console.log(this.teams);
        return this.teams.find(e => e._teamId === teamId);
    }

    addTeam(team:Team){
        console.log("Adding teams")
        this.teams.forEach(e => {
            if(e._teamId === team._teamId){
                console.log("ALREADY IN ARRAY")
                return;
            }
        })
        console.log("ADDING: " + JSON.stringify(team))
        this.teams.push(team);
    }

    setLogoPaths(orga_a:string|undefined, team_a:string|undefined, orga_b:string|undefined, team_b:string|undefined){
        this.logo_orga_path_a = orga_a;
        this.logo_team_path_a = team_a;
        this.logo_orga_path_b = orga_b;
        this.logo_team_path_b = team_b;
    }

    setSponsorLogoPaths(orga_a:string[]){
        this.sponsor_logo_paths = orga_a;
    }
}

 export const teamStore = new TeamStore();