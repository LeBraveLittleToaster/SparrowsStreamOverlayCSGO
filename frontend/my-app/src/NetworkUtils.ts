import Team from "./data/Team";
import axios, { AxiosResponse } from 'axios';
import ParseUtils from './ParseUtils';

const baseUrl = "http://localhost:5000";

class NetworkUtils {

    static getSettingDropTeamsOnClose():Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            axios.get("http://localhost:5000/teams/dropOnClose")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static uploadSettingDropTeamsOnServerClose(dropTeamsOnClose:boolean):Promise<void>{
        return new Promise<void>((resolve, reject) => {
            axios.put("http://localhost:5000/teams/dropOnClose",{dropTeamsOnClose:dropTeamsOnClose})
                .then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static getScore():Promise<any>{
        return new Promise<string>((resolve, reject) => {
            axios.get("http://localhost:5000/config/cs/score")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static uploadScore(score_a_new:number|undefined, score_b_new:number|undefined){
        return new Promise<boolean>((resolve, reject) => {
            axios.put("http://localhost:5000/config/cs/score", { score_a:score_a_new, score_b:score_b_new})
                .then((v) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static uploadCaster(caster_new: string|undefined): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            axios.put("http://localhost:5000/config/cs/caster", { caster:caster_new})
                .then((v) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static getCaster():Promise<string>{
        return new Promise<string>((resolve, reject) => {
            axios.get("http://localhost:5000/config/cs/caster")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static getActiveTeams():Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get("http://localhost:5000/config/cs/active_teams")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static getActiveLogos():Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get("http://localhost:5000/config/cs/active_logos")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
    static getActiveSponsorLogos():Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get("http://localhost:5000/config/cs/active_sponsor_logos")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static uploadActiveSponsorPictures(logo_path:string|undefined): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            axios.put("http://localhost:5000/config/cs/active_sponsor_logos", { logo_path:logo_path})
                .then((v) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static uploadActivePicture(isA: boolean, isTeamLogo: boolean, picUrl: string|undefined): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            axios.put("http://localhost:5000/config/cs/active_logos", { is_a: isA, is_team: isTeamLogo, pic_path: picUrl })
                .then((v) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static getAllSponsorPictureUrls(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            axios.get("http://localhost:5000/sponsorUrls")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });

    }

    static getAllPictureUrls(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            axios.get("http://localhost:5000/pictureUrls")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });

    }

    static getSponsorLogoPositionSetting(){
        return new Promise<number>((resolve, reject) => {
            axios.get("http://localhost:5000/setting/logoPos")
                .then((v) => {
                    resolve(v.data.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static uploadSponsorLogoPositionSetting(posIndex:number){
        axios.put(baseUrl + "/setting/logoPos", { logo_pos: posIndex }).then(() => console.log("Position uploaded")).catch((error) => console.log(error));
    }

    static uploadPicture(picture: File): Promise<AxiosResponse<any>> {
        let bodyFromData = new FormData();
        bodyFromData.append("avatar", picture);
        return axios.post("http://localhost:5000/profile", bodyFromData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    static uploadTeam(team: Team) {
        axios.put(baseUrl + "/teams/add", { name: team._name }).then(() => console.log("Uploaded team")).catch((error) => console.log(error));
    }

    static uploadActiveCsTeam(isA: boolean, teamId: string) {
        console.log("Uploading active cs team")
        axios.put(baseUrl + "/config/cs/active_teams",
            isA ? { a: teamId, b: undefined } : { a: undefined, b: teamId }).then(() => console.log("Uploaded")).catch((error) => console.log(error));
    }

    static getCurrentTeams(): Promise<Team[]> {
        console.log("Getting teams")
        return new Promise<Team[]>((resolve, reject) => {
            axios.get(baseUrl + "/teams").then(res => {
                console.log("Response=" + JSON.stringify(res.data))
                let arr: Team[] = []
                res.data.data.forEach((e: any) => {
                    let value: Team | undefined;
                    if ((value = ParseUtils.getTeamFromAny(e)) !== undefined) {
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