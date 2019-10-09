import {observable, computed, decorate, action} from 'mobx';

export const availableMaps = ["Inferno", "Overpass", "Vertigo", "Train", "Nuke", "Dust2", "Mirage"]
export const availableMapsPins = ["inferno.png", "overpass.png", "vertigo.png", "train.png", "nuke.png", "dust2.png", "mirage.png"]

class WaitStore {
    firstMap = {map_index: 2, score:{ct:0, t:0}, picked_by:"unknown"};
    secondMap = {map_index: 3, score:{ct:0, t:0}, picked_by:"unknown"};
    thirdMap = {map_index: 4, score:{ct:0, t:0}, picked_by:"unknown"};
    teamnames = {ct: "Loading ct name", t: "Loading t name"};
    countdown = {initValue: 10000};
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

    get retrieveFirstMap(){
        return this.firstMap;
    }

    get retrieveSecondMap(){
        return this.secondMap;
    }

    get retrieveThirdMap(){
        return this.thirdMap;
    }

    get retrieveTeamnames(){
        return this.teamnames;
    }

    get retrieveCountdown(){
        return this.countdown;
    }

    get retrieveInfoPictures(){
        return this.infoPictures;
    }

    get retrieveTeamPictures(){
        return this.teamPictures;
    }

    injectInitData(data){
        console.log("Injecting server data")
        console.log(JSON.stringify(data))
        this.adjustFirstMap(data.maps[0].map_index, data.maps[0].score.ct, data.maps[0].score.t, data.maps[0].picked_by)
        this.adjustSecondMap(data.maps[1].map_index, data.maps[1].score.ct, data.maps[1].score.t, data.maps[1].picked_by)
        this.adjustThirdMap(data.maps[2].map_index, data.maps[2].score.ct, data.maps[2].score.t, data.maps[2].picked_by)

    }

    adjustTeamnames(ct_name, t_name){
        if(ct_name !== undefined && ct_name !== this.teamnames.ct) this.teamnames.ct = ct_name;
        if(t_name !== undefined && t_name !== this.teamnames.t) this.teamnames.t = t_name;
    }

    adjustFirstMap(map_index, score_ct, score_t, picked_by){
        console.log("Updating first map")
        if(map_index !== undefined && map_index !== this.firstMap.map_index) this.firstMap.map_index = map_index;
        if(score_ct !== undefined && score_ct !== this.firstMap.score.ct) this.firstMap.score.ct = score_ct;
        if(score_t !== undefined && score_t !== this.firstMap.score.ct) this.firstMap.score.t = score_t;
        if(picked_by !== undefined && picked_by !== this.firstMap.picked_by) this.firstMap.picked_by = picked_by;
    }

    adjustSecondMap(map_index, score_ct, score_t, picked_by){
        console.log("Updating second map")
        if(map_index !== undefined && map_index !== this.secondMap.map_index) this.secondMap.map_index = map_index;
        if(score_ct !== undefined && score_ct !== this.secondMap.score.ct) this.secondMap.score.ct = score_ct;
        if(score_t !== undefined && score_t !== this.secondMap.score.ct) this.secondMap.score.t = score_t;
        if(picked_by !== undefined && picked_by !== this.secondMap.picked_by) this.secondMap.picked_by = picked_by;
    }

    adjustThirdMap(map_index, score_ct, score_t, picked_by){
        console.log("Updating third map")
        if(map_index !== undefined && map_index !== this.thirdMap.map_index) this.thirdMap.map_index = map_index;
        if(score_ct !== undefined && score_ct !== this.thirdMap.score.ct) this.thirdMap.score.ct = score_ct;
        if(score_t !== undefined && score_t !== this.thirdMap.score.ct) this.thirdMap.score.t = score_t;
        if(picked_by !== undefined && picked_by !== this.thirdMap.picked_by) this.thirdMap.picked_by = picked_by;
    }

    adjustCountdown(initValue){
        console.log("Updating initValue for countdown")
        if(initValue > 0){
            this.countdown.initValue = initValue;
        }
    }

    adjustInfoPictures(upLeftUrl, upRightUrl){
        console.log("Adjust info pictures")
        if(upLeftUrl !== undefined){
            this.infoPictures.upLeftUrl = upLeftUrl;
        }
        if(upRightUrl !== undefined){
            this.infoPictures.upRightUrl = upRightUrl;
        }
    }

    adjustTeamPictures(ctUrl, tUrl){
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
    retrieveFirstMap: computed,
    retrieveSecondMap: computed,
    retrieveThirdMap: computed,
    retrieveTeamnames: computed,
    retrieveCountdown: computed,
    retrieveTeamPictures: computed,
    retrieveInfoPictures: computed,
    adjustCountdown: action,
    adjustTeamnames: action,
    adjustFirstMap: action,
    adjustSecondMap: action,
    adjustThirdMap: action,
    adjustInfoPictures: action,
    adjustTeamPictures: action,
    injectInitData: action
});
export default WaitStore
