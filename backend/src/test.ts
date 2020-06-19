import {fileDb} from './filedb';
import Team from './data/Team';

fileDb.storeTeams([new Team("id1", "name1",undefined,undefined),new Team("id2", "name2",undefined,undefined)])

fileDb.getTeams().then((data:any) => {
    console.log(data);
    data.forEach((t:Team) => {
        console.log(t)
    });
}).catch((err) => {
    console.log(err)
})


let arr:number[] = [];
for(let i:number = 0; i < 1000;i++){
    arr.push(i);
}

let prom:Promise<void> = new Promise<void>((resolve, reject) => {
    arr.forEach((i:number) => {
        if(i === 7000) reject();
        resolve();
    });
})
prom.then(() => console.log("Success")).catch((err:any) => console.log("fuck"))

sleep(5000, () => console.log("Finished"))

function sleep(time:number, callback:any) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}
