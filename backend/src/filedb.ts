const fs = require('fs');
import Team from './data/Team';

const teamsFileName = "teams.json";
const pictureFolder = "./uploads/";

class FileDb{   
    
    _pictureUrls:string[] = [];
    
    loadPictureUrls(){
        fs.readdir(pictureFolder, (err:any, files:any) => {
            let names:string[] = [];
            console.log(files)
            files.forEach((file:any) => {
                console.log(file)
                names.push(file)
            });
            this._pictureUrls = names;
        })        
    }

    storeTeams(teams: Team[]){
        let data:string = JSON.stringify({teams:teams});
        console.log(data)
        fs.writeFileSync(teamsFileName, data, (err:any)=>console.log(err));
    }

    getTeams() : Promise<Team[]> {
        let promise = new Promise<Team[]>((resolve, reject) => {
            fs.readFile('./' + teamsFileName, (err:any, data:any) => {
                if(err) reject(err);
                let root;
                try{
                    root = JSON.parse(data)    
                    resolve(root.teams)
                }catch(err){
                    console.log("No teams to load")
                    resolve([])
                }
            });
        });
        return promise;
    }
}

export const fileDb = new FileDb();