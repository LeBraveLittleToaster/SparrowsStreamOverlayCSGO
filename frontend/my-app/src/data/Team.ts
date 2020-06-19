export default class Team{

    _teamId:string;
    _name:string;
    _logo_orga_path:string | undefined;
    _logo_team_path:string | undefined;

    constructor(teamId:string, name:string, logo_orga_path:string|undefined, logo_team_path:string|undefined){
        this._teamId = teamId;
        this._name = name;
        this._logo_orga_path = logo_orga_path;
        this._logo_team_path = logo_team_path;
    }
}