"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
var Utils;
(function (Utils) {
    function findSmallestFreeIndex(unOrderedListOfIndexes) {
        let index = 0;
        unOrderedListOfIndexes
            .sort((a, b) => { return a - b; })
            .forEach(e => {
            if (e === index) {
                index++;
            }
            else {
                return index;
            }
        });
        return unOrderedListOfIndexes.length;
    }
    Utils.findSmallestFreeIndex = findSmallestFreeIndex;
    function checkIfFilenameAlreadyExist(fileName, folderPath) {
        return new Promise((resolve, reject) => {
            fs.readdir(folderPath, (err, files) => {
                files.forEach((fileN) => {
                    if (fileN === fileName)
                        reject();
                });
                resolve();
            });
        });
    }
    Utils.checkIfFilenameAlreadyExist = checkIfFilenameAlreadyExist;
})(Utils || (Utils = {}));
exports.default = Utils;
//# sourceMappingURL=Utils.js.map