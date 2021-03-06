"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDb = void 0;
const fs = require('fs');
const teamsFileName = "teams.json";
const pictureFolder = "./uploads/";
const sponsorsFolder = "./sponsors/";
class FileDb {
    constructor() {
        this._pictureUrls = [];
        this._sponsorUrls = [];
        this._dropTeamsOnClose = false;
    }
    loadSponsorUrls() {
        if (!fs.existsSync(sponsorsFolder)) {
            console.log("Sponsorsfolder not existing...");
            fs.mkdirSync(sponsorsFolder);
        }
        fs.readdir(sponsorsFolder, (err, files) => {
            let names = [];
            console.log(files);
            files.forEach((file) => {
                console.log(file);
                names.push(file);
            });
            this._sponsorUrls = names;
        });
    }
    loadPictureUrls() {
        if (!fs.existsSync(pictureFolder)) {
            console.log("uploads folder not existing...");
            fs.mkdirSync(pictureFolder);
        }
        fs.readdir(pictureFolder, (err, files) => {
            let names = [];
            console.log(files);
            files.forEach((file) => {
                console.log(file);
                names.push(file);
            });
            this._pictureUrls = names;
        });
    }
    storeTeams(teams) {
        let data = JSON.stringify({ teams: teams });
        console.log(data);
        fs.writeFileSync(teamsFileName, data, (err) => console.log(err));
    }
    getTeams() {
        let promise = new Promise((resolve, reject) => {
            fs.readFile('./' + teamsFileName, (err, data) => {
                if (err)
                    reject(err);
                let root;
                try {
                    root = JSON.parse(data);
                    console.log("Loading teams:");
                    console.log(root);
                    resolve(root.teams);
                }
                catch (err) {
                    console.log("No teams to load");
                    resolve([]);
                }
            });
        });
        return promise;
    }
}
exports.fileDb = new FileDb();
//# sourceMappingURL=filedb.js.map