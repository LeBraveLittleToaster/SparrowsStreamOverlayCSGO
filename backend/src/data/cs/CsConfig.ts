import Team from "../Team";

class CsConfig {
    _teamAId: string | undefined = undefined;
    _teamBId: string | undefined = undefined;
    _team_b_color_ramp_index: number | undefined = undefined;
    _logo_orga_path_a: string | undefined = undefined;
    _logo_orga_path_b: string | undefined = undefined;
    _logo_team_path_a: string | undefined = undefined;
    _logo_team_path_b: string | undefined = undefined;
    _caster: string | undefined = undefined;
    _score_a: number | undefined = undefined;
    _score_b: number | undefined = undefined;
    _sponsor_logo_paths: string[] = [];
    _sponsor_logo_pos: number = 0;

    setLogoPath(isA: boolean, isTeam: boolean, picPath: string|undefined) {
        if (isA) {
            if (isTeam) {
                this._logo_team_path_a = picPath;
            } else {
                this._logo_orga_path_a = picPath
            }
        } else {
            if (isTeam) {
                this._logo_team_path_b = picPath;
            } else {
                this._logo_orga_path_b = picPath
            }
        }
    }

    
    addOrRemoveIfPresentAndGetActiveSponsor(picUrl:string|undefined):string[]{
        if(picUrl !== undefined){
            if(this._sponsor_logo_paths.findIndex( s => s === picUrl) === -1){
                this._sponsor_logo_paths.push(picUrl);
            }else{
                this._sponsor_logo_paths = this._sponsor_logo_paths.filter(s => s !== picUrl);
            }
        }
        return this._sponsor_logo_paths;
    }
}

export default CsConfig;