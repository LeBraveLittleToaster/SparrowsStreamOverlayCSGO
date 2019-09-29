class EventHandler{
    constructor(gameConfig , events) {
        this.gameConfig = gameConfig
        this.events = events
    }

    checkAndHandleEvents(payload){
        let responses = []
        this.events.forEach((event) => {
            let rsp = event.checkForEvent(this.gameConfig, payload);
            if(rsp !== undefined){
                responses.push(rsp)
            }
        })
        return responses
    }
}

class RoundEndEvent {
    constructor(winning_team, winning_team_name , roundnumber){
        this.winning_team = winning_team
        this.winning_team_name = winning_team_name
        this.roundnumber = roundnumber
    }

    static checkForEvent(gameConfig, payload){
        if(payload === undefined || typeof payload.added === 'undefined'){
            return undefined;
        }
     
        let winning_team_name = ""
        if(payload.round.win_team === 'T'){
            winning_team_name = gameConfig.t_name;
        }else{
            winning_team_name = gameConfig.ct_name;
        }

        return new RoundEndEvent(
            payload.round.win_team,
            winning_team_name,
            payload.map.round
        );
    }

    getJsonResponse(){
        return JSON.stringify(this);
    }
}

module.exports = {
    RoundEndEvent,
    EventHandler
}