import {fileDb} from './filedb';
import Team from './data/Team';

fileDb.storeTeams([new Team("id1", "name1"),new Team("id2", "name2")])

fileDb.getTeams().then((data:any) => {
    console.log(data);
    let root = JSON.parse(data);
    let teams:Team[] = root.teams;
    teams.forEach((t:Team) => {
        console.log(t)
    });
}).catch((err) => {
    console.log(err)
})