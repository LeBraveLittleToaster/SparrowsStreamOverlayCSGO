import Team from "../Team";

class CsConfig {
    _teamAId: string | undefined = undefined;
    _teamBId: string | undefined = undefined;
    _logo_orga_path_a: string | undefined = undefined;
    _logo_orga_path_b: string | undefined = undefined;
    _logo_team_path_a: string | undefined = undefined;
    _logo_team_path_b: string | undefined = undefined;
    _caster: string | undefined = undefined;
    _score_a: number | undefined = undefined;
    _score_b: number | undefined = undefined;

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
}

export default CsConfig;