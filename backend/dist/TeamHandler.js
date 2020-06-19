"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamHandler = void 0;
const uuid_1 = require("uuid");
class TeamHandler {
    constructor() {
        this.teams = [];
    }
    addTeams(teams) {
        teams.forEach((t) => this.addTeam(t));
    }
    addTeam(team) {
        let id = uuid_1.v4();
        if (this.teams.filter(e => e._teamId === id).length <= 0) {
            team._teamId = id;
            this.teams.push(team);
            return team;
        }
        return undefined;
    }
    get allTeams() {
        return this.teams;
    }
}
exports.teamHandler = new TeamHandler();
//# sourceMappingURL=TeamHandler.js.map