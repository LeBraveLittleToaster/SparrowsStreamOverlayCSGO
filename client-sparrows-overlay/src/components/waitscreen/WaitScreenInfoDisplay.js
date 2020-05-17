import React, { Component } from 'react';
import MapSelection from './MapSelection';
import './WaitScreenInfoDisplay.css';

class WaitScreenInfoDisplay extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        let overlay_background = "img/overlay_assets/OverlaySparrowsV2.png";

        let left_top_picture = "img/overlay_assets/default_logo.png";
        let left_logo = "img/overlay_assets/default_logo.png";
        let left_teamname = "left_teamname";

        let right_top_picture = "img/overlay_assets/default_logo.png";
        let right_logo = "img/overlay_assets/default_logo.png";
        let right_teamname = "right_teamname";


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
                    <MapSelection store={this.props.store} />
                </div>
            </div>
        );
    }
};

export default WaitScreenInfoDisplay;

