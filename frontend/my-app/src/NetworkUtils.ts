import Team from "./data/Team";
import axios, { AxiosResponse } from 'axios';
import ParseUtils from './ParseUtils';
import { csStore } from "./CsStore";

const baseUrl = "http://localhost:5000";

class NetworkUtils {

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
                    resolve(v.data.data.caster);
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