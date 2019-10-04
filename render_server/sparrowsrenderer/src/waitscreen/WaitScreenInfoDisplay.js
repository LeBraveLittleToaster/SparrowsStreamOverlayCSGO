import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './WaitScreenInfoDisplay.scss';
import CountdownWrapper from '../CountdownWrapper';
import { availableMaps } from '../store/Store';
import { Row, Col } from 'reactstrap';

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
        let mapThreeIndex = this.props.store.retrieveThirdMap;
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
                    <Row>
                        <Col id="col-spacer">
                            <div id="map-one-info">
                                <a id="map_text">{availableMaps[this.props.store.retrieveFirstMap.map_index]}</a>
                            </div>

                        </Col>
                        <Col id="col-spacer">
                            <div id="map-two-info">
                            <a id="map_text">{availableMaps[this.props.store.retrieveSecondMap.map_index]}</a>
                            </div>
                        </Col>
                        <Col id="col-spacer">
                            <div id="map-three-info">
                            <a id="map_text">{availableMaps[this.props.store.retrieveThirdMap.map_index]}</a>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
});

export default WaitScreenInfoDisplay;