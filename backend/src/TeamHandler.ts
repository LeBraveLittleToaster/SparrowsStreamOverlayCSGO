import Team from "./data/Team";
import { v4 as uuidv4 } from 'uuid';

class TeamHandler{
    private teams: Team[] = [];

    addTeam(team: Team):Team|undefined {
        let id:string = uuidv4()
        if(this.teams.filter(e => e.id === id).length <= 0){
            team.id = id;
            this.teams.push(team);
            return team;
        }
        return undefined;
    }

    get allTeams() : Team[] {
        return this.teams;
    }
}
export const teamHandler = new TeamHandler();