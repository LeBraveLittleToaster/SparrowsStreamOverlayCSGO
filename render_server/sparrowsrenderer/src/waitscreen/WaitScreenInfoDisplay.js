import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './WaitScreenInfoDisplay.scss';
import CountdownWrapper from '../CountdownWrapper';
import MapSelection from './MapSelection';

const WaitScreenInfoDisplay = observer(class WaitScreenInfoDisplay extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="container">
                <div id="up-left-info">
                    <img src={this.props.store.getInfoPictures.upLeftUrl} />
                </div>
                <div id="up-middle-info">
                    <CountdownWrapper store={this.props.store} />
                </div>
                <div id="up-right-info">
                    <img src={this.props.store.getInfoPictures.upRightUrl} />
                </div>

                <div id="mid-left-info">
                    <a>{this.props.store.teamnames.ct}</a>
                </div>
                <div id="mid-left-picture">
                <img src={this.props.store.getTeamPictures.ctUrl} />
                </div>


                <div id="mid-right-info">
                    <a>{this.props.store.teamnames.t}</a>
                </div>

                <div id="mid-right-picture">
                    <img src={this.props.store.getTeamPictures.tUrl} />
                </div>

                <div id="bottom-bar">
                    <MapSelection store={this.props.store}  />
                </div>

            </div>
        );
    }
});

export default WaitScreenInfoDisplay;