import {observable} from 'mobx';

class PictureStore {
    @observable picUrls:string[] = [];
    @observable sponsorUrls:string[] = [];
}

 export const pictureStore = new PictureStore();