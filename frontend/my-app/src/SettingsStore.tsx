import {observable} from 'mobx';

class SettingsStore {
    @observable isUsingTeamsPictureIfPresent:boolean = true;
}

 export const settingsStore = new SettingsStore();