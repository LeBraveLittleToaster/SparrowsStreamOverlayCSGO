"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Team {
    constructor(teamId, name) {
        this._teamId = teamId;
        this._name = name;
    }
    get teamId() {
        return this._teamId;
    }
    set id(teamId) {
        this._teamId = teamId;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
}
exports.default = Team;
//# sourceMappingURL=Team.js.map