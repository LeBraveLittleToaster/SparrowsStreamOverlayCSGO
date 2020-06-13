"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDb = void 0;
const fs = require('fs');
const teamsFileName = "teams.json";
class FileDb {
    storeTeams(teams) {
        let stream = fs.createWriteStream(teamsFileName);
        stream.write(JSON.stringify({ teams: teams }));
        stream.end();
    }
    getTeams() {
        let promise = new Promise((resolve, reject) => {
            fs.readFile('./' + teamsFileName, (err, data) => {
                if (err)
                    reject(err);
                resolve(JSON.parse(data).teams);
            });
        });
        return promise;
    }
}
exports.fileDb = new FileDb();
//# sourceMappingURL=filedb.js.map