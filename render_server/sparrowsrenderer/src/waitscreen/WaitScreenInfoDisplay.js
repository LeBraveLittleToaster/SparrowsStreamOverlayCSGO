import React, { Component } from 'react';
import { observer } from 'mobx-react';
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
                <div id="up-left-info">
                    <img src="http://localhost:4000/img/logo_up_left.png" />
                </div>
                <div id="up-middle-info">
                    <CountdownWrapper isNetworkUpdate={this.props.isNetworkUpdate} timermillis={this.state.timermillis} />
                </div>
                <div id="up-right-info">
                    <img src="http://localhost:4000/img/logo_up_right.png" />
                </div>

                <div id="mid-left-info">
                    <a>{this.props.store.teamnames.t}</a>
                </div>
                <div id="mid-left-picture">
                    <img src="http://localhost:4000/img/logo_sparrows.png" />
                </div>


                <div id="mid-right-info">
                    <a>{this.props.store.teamnames.ct}</a>
                </div>

                <div id="mid-right-picture">
                    <img src="http://localhost:4000/img/logo_opponent.png" />
                </div>

                <div id="bottom-bar">
                    <MapSelection store={this.props.store}  />
                </div>

            </div>
        );
    }
});

export default WaitScreenInfoDisplay;