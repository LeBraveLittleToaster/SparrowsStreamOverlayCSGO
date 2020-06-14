import Team from './data/Team';
class ParseUtils{
    static getTeamFromAny(data:any): Team | undefined {
        if(data["_teamId"] !== undefined && data["name"] !== undefined){
            return new Team(data["_teamId"], data["name"], data["logo_orga_path"], data["logo_team_path"]);
        }
        return undefined;
    }
}

export default ParseUtils;