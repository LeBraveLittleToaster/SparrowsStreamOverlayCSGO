import {observable, computed, decorate, action} from 'mobx';

export const availableMaps = ["tbd" , "Inferno", "Overpass", "Vertigo", "Train", "Nuke", "Dust2", "Mirage"]
export const availableMapsPins = ["unknown.png", "inferno.png", "overpass.png", "vertigo.png", "train.png", "nuke.png", "dust2.png", "mirage.png"]

class WaitStore {
    firstMap = {map_index: 0, score:{ct:0, t:0}, picked_by:"unknown"};
    secondMap = {map_index: 0, score:{ct:0, t:0}, picked_by:"unknown"};
    thirdMap = {map_index: 0, score:{ct:0, t:0}, picked_by:"unknown"};
    mapsSetup = {amountOfMaps: 3};
    teamnames = {ct: "Ulmer Spatzierfragger", t: "Opponent"};
    countdown = {initValue: 0};
    teamPictures = {
        tUrl: "http://localhost:4000/img/logo_opponent.png",
        ctUrl: "http://localhost:4000/img/logo_sparrows.png" 
    };
    infoPictures = {
        upLeftUrl: "http://localhost:4000/img/logo_up_left.png",
        upRightUrl: "http://localhost:4000/img/logo_up_right.png"
    };

    constructor(){
        console.log("Creating store")
    }

    get getFirstMap(){
        return this.firstMap;
    }

    get getSecondMap(){
        return this.secondMap;
    }

    get getThirdMap(){
        return this.thirdMap;
    }

    get getTeamnames(){
        return this.teamnames;
    }

    get getCountdown(){
        return this.countdown;
    }

    get getInfoPictures(){
        return this.infoPictures;
    }

    get getTeamPictures(){
        return this.teamPictures;
    }

    get getMapsSetup(){
        return this.mapsSetup;
    }

    setMapsSetup(amountOfMaps){
        if(amountOfMaps !== undefined) this.mapsSetup.amountOfMaps = amountOfMaps;
    }

    injectInitData(data){
        console.log("Injecting server data")
        console.log(JSON.stringify(data))
        if(data.maps !== undefined && data.maps !== null){
            this.setFirstMap(data.maps[0].map_index, data.maps[0].score.ct, data.maps[0].score.t, data.maps[0].picked_by)
            this.setSecondMap(data.maps[1].map_index, data.maps[1].score.ct, data.maps[1].score.t, data.maps[1].picked_by)
            this.setThirdMap(data.maps[2].map_index, data.maps[2].score.ct, data.maps[2].score.t, data.maps[2].picked_by)
        }
        if(data.mapsSetup !== undefined && data.mapsSetup !== null && data.mapsSetup.amountOfMaps !== undefined && data.mapsSetup.amountOfMaps !== null){
            this.setMapsSetup(data.mapsSetup.amountOfMaps);
        }
        if(data.teamnames !== undefined && data.teamnames !== null){
            this.setTeamnames(data.teamnames.ct, data.teamnames.t)
        }
    }

    setTeamnames(ct_name, t_name){
        if(ct_name !== undefined && ct_name !== this.teamnames.ct) this.teamnames.ct = ct_name;
        if(t_name !== undefined && t_name !== this.teamnames.t) this.teamnames.t = t_name;
    }

    setFirstMap(map_index, score_ct, score_t, picked_by, isActive){
        console.log("Updating first map")
        if(map_index !== undefined && map_index !== this.firstMap.map_index) this.firstMap.map_index = map_index;
        if(score_ct !== undefined && score_ct !== this.firstMap.score.ct) this.firstMap.score.ct = score_ct;
        if(score_t !== undefined && score_t !== this.firstMap.score.t) this.firstMap.score.t = score_t;
        if(picked_by !== undefined && picked_by !== this.firstMap.picked_by) this.firstMap.picked_by = picked_by;
        if(isActive !== undefined && isActive !== this.firstMap.isActive) this.firstMap.isActive = isActive;
    }

    setSecondMap(map_index, score_ct, score_t, picked_by, isActive){
        console.log("Updating second map")
        if(map_index !== undefined && map_index !== this.secondMap.map_index) this.secondMap.map_index = map_index;
        if(score_ct !== undefined && score_ct !== this.secondMap.score.ct) this.secondMap.score.ct = score_ct;
        if(score_t !== undefined && score_t !== this.secondMap.score.t) this.secondMap.score.t = score_t;
        if(picked_by !== undefined && picked_by !== this.secondMap.picked_by) this.secondMap.picked_by = picked_by;
        if(isActive !== undefined && isActive !== this.secondMap.isActive) this.secondMap.isActive = isActive;
    }

    setThirdMap(map_index, score_ct, score_t, picked_by, isActive){
        console.log("Updating third map")
        if(map_index !== undefined && map_index !== this.thirdMap.map_index) this.thirdMap.map_index = map_index;
        if(score_ct !== undefined && score_ct !== this.thirdMap.score.ct) this.thirdMap.score.ct = score_ct;
        if(score_t !== undefined && score_t !== this.thirdMap.score.t) this.thirdMap.score.t = score_t;
        if(picked_by !== undefined && picked_by !== this.thirdMap.picked_by) this.thirdMap.picked_by = picked_by;
        if(isActive !== undefined && isActive !== this.thirdMap.isActive) this.thirdMap.isActive = isActive;
    }

    setCountdown(initValue){
        console.log("Updating initValue for countdown")
        if(initValue > 0){
            this.countdown.initValue = initValue;
        }
    }

    setInfoPictures(upLeftUrl, upRightUrl){
        console.log("set info pictures")
        if(upLeftUrl !== undefined){
            this.infoPictures.upLeftUrl = upLeftUrl;
        }
        if(upRightUrl !== undefined){
            this.infoPictures.upRightUrl = upRightUrl;
        }
    }

    setTeamPictures(ctUrl, tUrl){
        console.log("Updating team pictures")
        if(this.teamPictures.ctUrl !== undefined){
            this.teamPictures.ctUrl = ctUrl;
        }
        if(this.teamPictures.tUrl !== undefined){
            this.teamPictures.tUrl = tUrl;
        }
    }

    
}

decorate(WaitStore,{
    firstMap: observable,
    secondMap: observable,
    thirdMap: observable,
    teamnames: observable,
    countdown: observable,
    infoPictures: observable,
    teamPictures: observable,
    mapsSetup: observable,
    getFirstMap: computed,
    getSecondMap: computed,
    getThirdMap: computed,
    getTeamnames: computed,
    getCountdown: computed,
    getTeamPictures: computed,
    getInfoPictures: computed,
    getMapsSetup: computed,
    setCountdown: action,
    setTeamnames: action,
    setFirstMap: action,
    setSecondMap: action,
    setThirdMap: action,
    setInfoPictures: action,
    setTeamPictures: action,
    setMapsSetup: action,
    injectInitData: action
});
export default WaitStore
