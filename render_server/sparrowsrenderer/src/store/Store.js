import {observable, computed} from 'mobx';

class WaitStore {
    @observable mapNameOne = "";
    @observable mapNameTwo = "";
    @observable mapNameThree = "";

    @computed get maps(){
        return [this.mapNameOne, this.mapNameTwo ,this.mapNameThree];
    }

    setMap(mapNameOne, mapNameTwo, mapNameThree){
        if(mapNameOne !== null && mapNameOne !== undefined){
            this.mapNameOne = mapNameOne;
        }
        if(mapNameTwo !== null && mapNameTwo !== undefined){
            this.mapNameTwo = mapNameTwo;
        }
        if(mapNameThree !== null && mapNameThree !== undefined){
            this.mapNameThree = mapNameThree;
        }
    }
}
export default WaitStore;