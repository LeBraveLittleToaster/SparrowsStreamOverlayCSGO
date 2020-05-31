import Team from "./data/Team";
import axios from 'axios';
import ParseUtils from './ParseUtils';

const baseUrl = "http://localhost:5000";

class NetworkUtils {


    static uploadTeam(team: Team) {
        axios.put(baseUrl+"/teams/add", {name:team.name}).then(() => console.log("Uploaded team")).catch((error) => console.log(error));
    }

    static uploadActiveCsTeam(isA:boolean, teamId:string){
        console.log("Uploading active cs team")
        axios.put(baseUrl + "/config/cs/active_teams",
            isA?{a:teamId, b:undefined}:{a:undefined, b:teamId}).then(() => console.log("Uploaded")).catch((error) => console.log(error));
    }

    static getCurrentTeams(): Promise<Team[]> {
        console.log("Getting teams")
        return new Promise<Team[]>((resolve, reject) => {
            axios.get(baseUrl + "/teams").then(res => {
                console.log("Response=" + JSON.stringify(res.data))
                let arr:Team[] = []
                res.data.data.forEach((e:any) => {
                    let value:Team|undefined;
                    if((value=ParseUtils.getTeamFromAny(e)) !== undefined){
                        arr.push(value);
                    }
                });
                resolve(arr);
            })
                .catch(error => {
                    console.log(error)
                    reject();
                })
        });
    }
}
export default NetworkUtils;