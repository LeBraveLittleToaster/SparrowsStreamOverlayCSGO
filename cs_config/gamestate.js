class GameStateCSGO{
    constructor(steam){
        this.players = new Set([]);
        this.steam = steam;
    }

    addPlayer(isCt, steam_url){
        let userobj = {url: steam_url, steam_id64:undefined, isCt: isCt, summary: undefined}
        if(isCt){
            this.players.add(userobj);
        }else{
            this.players.add(userobj);
        }
        this.loadSteamUserSummary(steam_url, userobj);
    }
    
    getPlayer(steam_id64){
        for(let item of this.players){
            if(item.steam_id64 === steam_id64){
                return item;
            }
        }
        return undefined;
    }

    getCtPlayers(){
        return this.players.players_ct;
    }
    getTPlayers(){
        return this.players.players_t;
    }

    loadSteamUserSummary(steam_url, userobj){
        this.steam.resolve(steam_url).then(id => {
            this.steam.getUserSummary(id).then(summary => {
                userobj.summary = summary;
            });
        });
    }
}

module.exports = GameStateCSGO;