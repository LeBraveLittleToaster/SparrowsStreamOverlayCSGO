"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CsConfig {
    constructor() {
        this._teamAId = "";
        this._teamBId = "";
    }
    set activeTeamA(teamId) {
        this._teamAId = teamId;
    }
    get activeTeamA() {
        return this._teamAId;
    }
    set activeTeamB(teamId) {
        this._teamBId = teamId;
    }
    get activeTeamB() {
        return this._teamBId;
    }
}
exports.default = CsConfig;
//# sourceMappingURL=CsConfig.js.map