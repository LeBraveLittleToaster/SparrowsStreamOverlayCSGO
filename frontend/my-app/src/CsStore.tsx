import {observable} from 'mobx';

class CsStore {
    @observable score_a: number = 0;
    @observable score_b: number = 0;
    @observable caster_names: string|undefined = "Some cool caster"
}

 export const csStore = new CsStore();