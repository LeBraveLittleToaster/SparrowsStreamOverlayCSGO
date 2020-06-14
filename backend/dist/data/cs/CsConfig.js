"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CsConfig {
    constructor() {
        this._teamAId = undefined;
        this._teamBId = undefined;
        this._logo_orga_path_a = undefined;
        this._logo_orga_path_b = undefined;
        this._logo_team_path_a = undefined;
        this._logo_team_path_b = undefined;
        this._caster = undefined;
    }
    setLogoPath(isA, isTeam, picPath) {
        if (isA) {
            if (isTeam) {
                this._logo_team_path_a = picPath;
            }
            else {
                this._logo_orga_path_a = picPath;
            }
        }
        else {
            if (isTeam) {
                this._logo_team_path_b = picPath;
            }
            else {
                this._logo_orga_path_b = picPath;
            }
        }
    }
}
exports.default = CsConfig;
//# sourceMappingURL=CsConfig.js.map