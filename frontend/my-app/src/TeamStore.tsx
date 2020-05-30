import {observable} from 'mobx';
import Player from "./Player";

class TeamStore {
    @observable team_name_a: string = "Team Name A";
    @observable players_a: Player[] = [];

    @observable team_name_b: string = "Team Name B";
    @observable players_b: Player[] = [];
    
}

 export const teamStore = new TeamStore();