import Player from "./Player";

export default class Team{
    private players: Player[];

    constructor(players: Player[]){
        this.players = players;
    }

    get getPlayers():Player[]{
        return this.players;
    }

    set setPlayers(players:Player[]){
        this.players = players;
    }
}