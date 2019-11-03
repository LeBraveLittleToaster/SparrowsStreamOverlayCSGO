class EventHandler{
    constructor(gameConfig, gamestate , events) {
        this.gameConfig = gameConfig
        this.gamestate = gamestate
        this.events = events
        this.next_event_to_render = undefined
    }

    checkAndHandleEvents(payload){
        let responses = []
        this.events.forEach((checkForEvent) => {
            let rsp = checkForEvent(this.gameConfig, payload);
            if(rsp !== undefined){
                responses.push(rsp)
            }
        })
        return responses
    }
}

class PlayerComparisonEvent{
    constructor(name_ct, team_ct, score_ct, name_t, team_t, score_t){
        this.priority = 1;
        this.name_ct = name_ct;
        this.team_ct = team_ct;
        this.score_ct = score_ct;
        this.name_t = name_t;
        this.team_t = team_t;
        this.score_t = score_t;
    }

    static checkForEvent(gameConfig, payload){
        if(payload === undefined){
            return undefined;
        }
     
        //only for testing!
        if(payload.type !== "player_comparison"){
            return undefined;
        }
        
        

        return new PlayerComparisonEvent(
            "LeCounterPlayer",
            gameConfig.ct_name,
            {
                kills: 12,
                assists: 34,
                deaths: 56,
                adr: 789
            },
            "LeTerroristPlayer",
            gameConfig.t_name,
            {
                kills: 21,
                assists: 43,
                deaths: 65,
                adr: 987
            }
        );
    }

    getJsonResponse(){
        let rsp = {
            type: "player_comparison",
            data: this
        }
        return JSON.stringify(rsp);
    }
}


class RoundEndEvent {
    constructor(hasCtWon, winning_team_name , round){
        this.priority = 0;
        this.hasCtWon = hasCtWon
        this.winning_team_name = winning_team_name
        this.round = round
    }

    static checkForEvent(gameConfig, payload){
        console.log("Checking for event...")
        if(payload === undefined || typeof payload.added === 'undefined'){
            return undefined;
        }
     
        console.log("Event not empty...")
        let winning_team_name = ""
        let hasCtWon = false;
        if(payload.round.win_team === 'T'){
            winning_team_name = gameConfig.t_name;
            hasCtWon = false;
        }else{
            winning_team_name = gameConfig.ct_name;
            hasCtWon = true;
        }

        console.log("Creating event...")
        let event = new RoundEndEvent(
            hasCtWon,
            winning_team_name,
            payload.map.round
        );
        console.log("Created event...")
        console.log(typeof event)
        console.log(event instanceof RoundEndEvent)
        console.log("Finished event check...")
        return event;
    }

    getJsonResponse(){
        let rsp = {
            type: "end_round",
            data: this
        }
        return JSON.stringify(rsp);
    }
}

class MultikillEvent {
    constructor(){
        this.priority = 5;
    }

    static checkForEvent(gameConfig, payload){
        if(payload === undefined || typeof payload.added === 'undefined'){
            return undefined;
        }

        return new MultikillEvent();
    }

    getJsonResponse(){
        let rsp = {
            type: "multikill_event",
            data: this
        }
        return JSON.stringify(rsp);
    }
}

module.exports = {
    MultikillEvent,
    RoundEndEvent,
    PlayerComparisonEvent,
    EventHandler
}