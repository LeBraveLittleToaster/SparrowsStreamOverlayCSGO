import {observable} from 'mobx';
import Team from "./data/Team";

class TeamStore {
    @observable teams:Team[] = [];
    @observable team_a_id:string = "";
    @observable team_b_id:string = "";
    @observable logo_orga_path_a: string = "logo512.png";
    @observable logo_orga_path_b: string = "logo512.png";
    @observable logo_team_path_a: string = "logo512.png";
    @observable logo_team_path_b: string = "logo512.png";

    getTeamWithId(teamId:string):Team|undefined{
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
}

 export const teamStore = new TeamStore();