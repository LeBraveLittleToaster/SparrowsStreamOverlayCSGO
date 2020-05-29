import {observable} from 'mobx';

class VsStore {
    @observable score_a: number = 0;
    @observable score_b: number = 0;
    @observable logo_orga_path_a: string = "logo512.png";
    @observable logo_orga_path_b: string = "logo512.png";
    @observable logo_team_path_a: string = "logo512.png";
    @observable logo_team_path_b: string = "logo512.png";
    @observable team_name_a: string = "Team name A";
    @observable team_name_b: string = "Team name B";
    @observable caster_names: string = "Some cool caster"    
}

 export const vsStore = new VsStore();