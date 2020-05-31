import Team from './data/Team';
class ParseUtils{
    static getTeamFromAny(data:any): Team | undefined {
        if(data["id"] !== undefined && data["name"] !== undefined){
            return new Team(data["id"], data["name"]);
        }
        return undefined;
    }
}

export default ParseUtils;