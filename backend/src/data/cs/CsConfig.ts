import Team from "../Team";

class CsConfig{
    private _teamAId:string = "";
    private _teamBId:string = "";

    set activeTeamA(teamId:string){
        this._teamAId = teamId;
    }

    get activeTeamA(){
        return this._teamAId;
    }

    set activeTeamB(teamId:string){
        this._teamBId = teamId;
    }

    get activeTeamB(){
        return this._teamBId;
    }
}

export default CsConfig;