"use strict";
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
})(Utils || (Utils = {}));
//# sourceMappingURL=Utils.js.map