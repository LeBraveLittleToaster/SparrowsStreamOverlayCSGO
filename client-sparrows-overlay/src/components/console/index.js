import React, { useState, useEffect } from 'react';
import MapSetupView from './MapSetupView';
import MapChangerView from './MapChangerView';
import TimerView from './TimerView';
import Teamnames from './Teamnames';

function get_config(value) {
    let config = null;
    let number = 0;
    if (value !== null) {
        let uuid = value.selected_config_uuid;
        config = value.data.find(foo => foo.uuid == uuid);
    }
    return config;
}


var default_value = {
    "selected_config_uuid":"495762cd-c230-4260-801b-440367866220",
    "steam_api_key": null,
    "data": [
        {
            "uuid": "495762cd-c230-4260-801b-440367866220",
            "schema": "csgo",
            "mapselection": {
                "amount_of_maps": 0,
                "maps": [],
                "begin": "2020-05-18 11:21",
                "team_name_left": "left",
                "team_name_right": "right"
            }
        }
    ]
};


function Console(props) {


    const [mapselection, set_mapselection] = useState(props.value || default_value);


    let local_mapselection = props.value || mapselection;
    let config = get_config(local_mapselection);



    return (
        <div>
            <p> {JSON.stringify(local_mapselection)}</p>
            <p> {JSON.stringify(config)}</p>
            <h1> Mapselection </h1>
            {config !== null && <MapSetupView
                value={config.mapselection.amount_of_maps}
                onChange={(e) => {
                    let objIndex = mapselection.data.findIndex((obj => obj.uuid === mapselection.selected_config_uuid));
                    let newdata = mapselection.data;
                    newdata[objIndex].mapselection.amount_of_maps = e;
                    newdata[objIndex].mapselection.maps = [];
                    for (var i = 0; i < e; i++) {
                        newdata[objIndex].mapselection.maps.push({
                            "map_name": "cache",
                            "score_left": 0,
                            "score_right": 0,
                            "pick_by": "left"
                        })
                    }
                    let newmapselection = { ...mapselection, data: newdata };
                    set_mapselection(newmapselection);
                    if (props.onChange !== null) {
                        props.onChange(newmapselection);
                    }
                }
                }
            />
            }


            {config !== null && config.mapselection.maps.map((value, index) => {
                return (<div>
                    <h2> Map {index + 1} </h2>
                    <MapChangerView 
                        value={config.mapselection.maps[index]}
                        onChange={(e) => {
                            let objIndex = mapselection.data.findIndex((obj => obj.uuid === mapselection.selected_config_uuid));
                            let newdata = mapselection.data;
                            newdata[objIndex].mapselection.maps[index] = e;
                            let newmapselection = { ...mapselection, data: newdata };
                            set_mapselection(newmapselection);
                            if (props.onChange !== null) {
                                props.onChange(newmapselection);
                            }
                        }}
                    />
                </div>)
            })}

            <h1> Timer </h1>
            <TimerView />

            <h1>Teamnnames</h1>
            <Teamnames />


        </div>
    );
};

export default Console;

//<button onClick={}>Save</button>