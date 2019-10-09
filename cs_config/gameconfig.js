class CsgoGameConfig{
    constructor(configJson){
        console.log("Creating GameConfig")
        this.maps = [
            {map_index: 4, score: {ct:0, t:0}, picked_by:"Sparrows"},
            {map_index: 3, score: {ct:0, t:0}, picked_by:"Sparrows"},
            {map_index: 2, score: {ct:0, t:0}, picked_by:"Sparrows"}
        ];
        
        this.ct_name = "CT_SPARROWS"
        this.t_name = "T_SPARROWS"
    }

    setMapData(data){
        this.maps = data.maps;
    }

    setTeamNames(data){
        this.ct_name = data.teamnames.ct;
        this.t_name = data.teamnames.t;

    }

    getJsonResponse(){
        return {
            maps: this.maps,
            teamnames: {
                ct: this.ct_name,
                t: this.t_name
            }
        }
    }
}

module.exports = {CsgoGameConfig};