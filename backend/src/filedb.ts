const fs = require('fs');
import Team from './data/Team';

const teamsFileName = "teams.json";

class FileDb{    
    storeTeams(teams: Team[]){
        let stream = fs.createWriteStream(teamsFileName);
        stream.write(JSON.stringify({teams:teams}));
        stream.end();
    }

    getTeams() : Promise<Team[]> {
        let promise = new Promise<Team[]>((resolve, reject) => {
            fs.readFile('./' + teamsFileName, (err:any, data:any) => {
                if(err) reject(err);
                resolve(JSON.parse(data).teams);
            });
        });
        return promise;
    }
}

export const fileDb = new FileDb();