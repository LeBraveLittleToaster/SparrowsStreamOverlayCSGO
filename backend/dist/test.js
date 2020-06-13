"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filedb_1 = require("./filedb");
const Team_1 = __importDefault(require("./data/Team"));
filedb_1.fileDb.storeTeams([new Team_1.default("id1", "name1", undefined, undefined), new Team_1.default("id2", "name2", undefined, undefined)]);
filedb_1.fileDb.getTeams().then((data) => {
    console.log(data);
    data.forEach((t) => {
        console.log(t);
    });
}).catch((err) => {
    console.log(err);
});
let arr = [];
for (let i = 0; i < 1000; i++) {
    arr.push(i);
}
let prom = new Promise((resolve, reject) => {
    arr.forEach((i) => {
        if (i === 7000)
            reject();
        resolve();
    });
});
prom.then(() => console.log("Success")).catch((err) => console.log("fuck"));
sleep(5000, () => console.log("Finished"));
function sleep(time, callback) {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {
        ;
    }
    callback();
}
//# sourceMappingURL=test.js.map