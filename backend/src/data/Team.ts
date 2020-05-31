export default class Team{
    
    private _teamId:string;
    private _name:string;

    constructor(teamId:string, name:string){
        this._teamId = teamId;
        this._name = name;
    }

    get teamId(): string{
        return this._teamId;
    }

    set id(teamId: string) {
        this._teamId = teamId;
    }

    get name(): string{
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }
}