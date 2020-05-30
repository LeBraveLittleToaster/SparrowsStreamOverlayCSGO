class Player{

    private name: string;

    constructor(name: string){
        this.name = name;
    }

    get playername(): string {
        return this.name;
    }

    set playername(name: string){
        this.name = name;
    }
}

export default Player;