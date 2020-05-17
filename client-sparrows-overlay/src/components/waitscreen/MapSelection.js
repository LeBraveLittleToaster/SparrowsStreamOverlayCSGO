import React, { Component } from 'react';
import './WaitScreenInfoDisplay.css';
import MapInfo from './MapInfo';

class MapSelection extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div id="maps_container">
        <MapInfo map={"nuke"} map_number={1}/>
        <MapInfo map={"nuke"} map_number={2}/>
        <MapInfo map={"nuke"} map_number={3}/>
        </div>;
    }
};

export default MapSelection;
