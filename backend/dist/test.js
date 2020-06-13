"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filedb_1 = require("./filedb");
const Team_1 = __importDefault(require("./data/Team"));
filedb_1.fileDb.storeTeams([new Team_1.default("id1", "name1"), new Team_1.default("id2", "name2")]);
filedb_1.fileDb.getTeams().then((data) => {
    console.log(data);
    let root = JSON.parse(data);
    let teams = root.teams;
    teams.forEach((t) => {
        console.log(t);
    });
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=test.js.map