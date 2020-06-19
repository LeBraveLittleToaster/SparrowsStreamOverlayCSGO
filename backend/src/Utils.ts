const fs = require('fs');
module Utils {
    export function findSmallestFreeIndex(unOrderedListOfIndexes: number[]) {
        let index = 0;
        unOrderedListOfIndexes
            .sort((a, b) => { return a - b; })
            .forEach(e => {
                if (e === index) {
                    index++;
                } else {
                    return index;
                }
            });
        return unOrderedListOfIndexes.length;
    }

    export function checkIfFilenameAlreadyExist(fileName: string, folderPath: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.readdir(folderPath, (err:any, files: string[]) => {
                files.forEach((fileN:string) => {
                    if(fileN === fileName){
                        reject();
                    } 
                })
                resolve();
            })
        });
    }
}

export default Utils;