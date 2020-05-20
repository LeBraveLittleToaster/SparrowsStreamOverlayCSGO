import React, { useState } from 'react';
import MapInfo from './MapInfo';
import './WaitScreenInfoDisplay.css';

var default_value = {
    "selected_config_uuid": "495762cd-c230-4260-801b-440367866220",
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

function get_config(value) {
    let config = null;
    let number = 0;
    if (value !== null) {
        let uuid = value.selected_config_uuid;
        config = value.data.find(foo => foo.uuid === uuid);
    }
    return config;
}


function WaitScreenInfoDisplay(props) {

    const [value, set_value] = useState(props.value || default_value);
    let local_value = props.value || value;
    let config = get_config(local_value);


    let overlay_background = "img/overlay_assets/OverlaySparrowsV2.png";

    let left_top_picture = "img/overlay_assets/default_logo.png";
    let left_logo = "img/overlay_assets/default_logo.png";
    let left_teamname = config.mapselection.team_name_left;

    let right_top_picture = "img/overlay_assets/default_logo.png";
    let right_logo = "img/overlay_assets/default_logo.png";
    let right_teamname = config.mapselection.team_name_right;


    return (
        <div id="container">
            <img alt="missing" id="overlayimg" src={overlay_background}></img>
            <div id="up-left-info">
                <img src={left_top_picture} />
            </div>
            <div id="up-middle-info">
                <p> To do CountdownWrapper </p>
            </div>
            <div id="up-right-info">
                <img src={right_top_picture} />
            </div>

            <div id="mid-left-info">
                <a>{left_teamname}</a>
            </div>
            <div id="mid-left-picture">
                <img src={left_logo} />
            </div>

            <div id="mid-right-info">
                <a>{right_teamname}</a>
            </div>

            <div id="mid-right-picture">
                <img src={right_logo} />
            </div>

            <div id="bottom-bar">
            <div id="maps_container">
            {config !== null && config.mapselection.maps.map((value, index) => {
                return (<MapInfo value={config.mapselection.maps[index]} map_number={index}/>)
            })}
            </div>
            </div>
        </div>
    );

};

export default WaitScreenInfoDisplay;

