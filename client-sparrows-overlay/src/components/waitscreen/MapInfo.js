import React, { useState } from 'react';

const default_value = {
    "map_name": "cache",
    "score_left": 3,
    "score_right": 1,
    "pick_by": "left"
}

const img_paths = [
    {
        map_name:"cache",
        path:"img/csgo/map_icons/cache.png"
    },{
        map_name:"cobblestone",
        path:"img/csgo/map_icons/cobblestone.png"
    },{
        map_name:"dust2",
        path:"img/csgo/map_icons/dust2.png"
    },{
        map_name:"inferno",
        path:"img/csgo/map_icons/inferno.png"
    },{
        map_name:"mirage",
        path:"img/csgo/map_icons/mirage.png"
    },{
        map_name:"nuke",
        path:"img/csgo/map_icons/nuke.png"
    },{
        map_name:"overpass",
        path:"img/csgo/map_icons/overpass.png"
    },{
        map_name:"train",
        path:"img/csgo/map_icons/train.png"
    },{
        map_name:"vertigo",
        path:"img/csgo/map_icons/vertigo.png"
    }
  
]


function MapInfo(props) {

    const [value, set_value] = useState(props.value || default_value);

    let local_value = props.value || value;

    let map_img = img_paths.find(item => item.map_name === local_value.map_name).path;
    let score_left = local_value.score_left;
    let score_right = local_value.score_right;
    let map_number = `Map ${props.map_number || 0}`;

    return (
        <div className="map-info">
            <img id="map-picture" src={map_img} alt="map_img" />
            <a id="score-text">{score_left} : {score_right}</a>
            <a id="map-text">{map_number}</a>
        </div>
    );

};

export default MapInfo;
