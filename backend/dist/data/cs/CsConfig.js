"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CsConfig {
    constructor() {
        this._teamAId = undefined;
        this._teamBId = undefined;
        this._team_b_color_ramp_index = undefined;
        this._logo_orga_path_a = undefined;
        this._logo_orga_path_b = undefined;
        this._logo_team_path_a = undefined;
        this._logo_team_path_b = undefined;
        this._caster = undefined;
        this._score_a = undefined;
        this._score_b = undefined;
        this._sponsor_logo_paths = [];
        this._sponsor_logo_pos = 0;
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
    addOrRemoveIfPresentAndGetActiveSponsor(picUrl) {
        if (picUrl !== undefined) {
            if (this._sponsor_logo_paths.findIndex(s => s === picUrl) === -1) {
                this._sponsor_logo_paths.push(picUrl);
            }
            else {
                this._sponsor_logo_paths = this._sponsor_logo_paths.filter(s => s !== picUrl);
            }
        }
        return this._sponsor_logo_paths;
    }
}
exports.default = CsConfig;
//# sourceMappingURL=CsConfig.js.map