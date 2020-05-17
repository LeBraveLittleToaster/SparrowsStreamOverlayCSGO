import React, { Component } from 'react';

class MapInfo extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let map_img = "img/csgo/map_icons/nuke.png";
        let ct_score = 4;
        let t_score = 1;
        let map_number = `Map ${this.props.map_number || 0}`;

        return (
            <div className="map-info">
                <img id="map-picture" src={map_img} alt="map_img" />
                <a id="score-text">{ct_score} : {t_score}</a>
                <a id="map-text">{map_number}</a>
            </div>
        );
    }
};

export default MapInfo;
