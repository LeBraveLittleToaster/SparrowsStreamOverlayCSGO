import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './WaitScreenInfoDisplay.scss';
import CountdownWrapper from '../CountdownWrapper';
import MapSelection from './MapSelection';

const WaitScreenInfoDisplay = observer(class WaitScreenInfoDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timermillis: 100000,

        }
    }

    render() {
        let mapOneIndex = this.props.store.retrieveFirstMap.map_index;
        let mapTwoIndex = this.props.store.retrieveSecondMap.map_index;
        let mapThreeIndex = this.props.store.retrieveThirdMap.map_index;
        let scoreMapOne = this.props.store.retrieveFirstMap.score.ct + " : " + this.props.store.retrieveFirstMap.score.t;
        let scoreMapSecond = this.props.store.retrieveSecondMap.score.ct + " : " + this.props.store.retrieveSecondMap.score.t;
        let scoreMapThree = this.props.store.retrieveThirdMap.score.ct + " : " + this.props.store.retrieveThirdMap.score.t;
        console.log("Indexes:[ " + mapOneIndex + " , " + mapTwoIndex + " , " + JSON.stringify(mapThreeIndex) + " ]");
        return (
            <div id="container">
                <h1>{mapOneIndex}</h1>
                <div id="up-left-info">

                </div>

                <CountdownWrapper isNetworkUpdate={this.props.isNetworkUpdate} timermillis={this.state.timermillis} />

                <div id="up-right-info">

                </div>

                <div id="mid-left-info">

                </div>
                <div id="mid-left-picture">

                </div>

                <div id="mid-right-info">

                </div>

                <div id="mid-right-picture">

                </div>

                <div id="bottom-bar">
                    <MapSelection maps={[mapOneIndex, mapTwoIndex, mapThreeIndex]} scores={[scoreMapOne, scoreMapSecond, scoreMapThree]}/>
                </div>

            </div>
        );
    }
});

export default WaitScreenInfoDisplay;