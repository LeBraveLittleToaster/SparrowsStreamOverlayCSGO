import {observable} from 'mobx';

class SettingsStore {
    @observable sponsor_logo_position:number = 0;
    @observable isDroppingTeamsOnClose:boolean = false;
}

 export const settingsStore = new SettingsStore();