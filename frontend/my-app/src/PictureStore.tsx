import {observable} from 'mobx';

class PictureStore {
    @observable picUrls:string[] = [];
}

 export const pictureStore = new PictureStore();