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
}