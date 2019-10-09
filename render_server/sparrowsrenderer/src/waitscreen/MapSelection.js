import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import './WaitScreenInfoDisplay.scss';
import { availableMaps, availableMapsPins } from '../store/Store';
import { Row, Col } from 'reactstrap';

class MapSelection extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log("Render is called")
        return (<div id="maps_container">
            <Row>
                <Col id="col-spacer">
                    <div id="map-one-info">
                        <Row>
                            <Col>
                                <img src={availableMapsPins[this.props.store.retrieveFirstMap.map_index]} alt="helloWorld2" />
                            </Col>
                            <Col>
                                <Col>
                                    <Row id="vert">
                                        <a id="map-text">{availableMaps[this.props.store.retrieveFirstMap.map_index]}</a>
                                        <a id="score-text">{this.props.store.retrieveFirstMap.score.ct} : {this.props.store.retrieveFirstMap.score.t}</a>
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                    </div>

                </Col>
                <Col id="col-spacer">
                    <div id="map-two-info">
                        <Row>
                            <Col>
                                <img src={availableMapsPins[this.props.store.retrieveSecondMap.map_index]} alt="helloWorld2" />
                            </Col>
                            <Col>
                                <Col>
                                    <Row>
                                        <a id="map-text">{availableMaps[this.props.store.retrieveSecondMap.map_index]}</a>
                                        <a id="score-text">{this.props.store.retrieveSecondMap.score.ct} : {this.props.store.retrieveSecondMap.score.t}</a>
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col id="col-spacer">
                    <div id="map-three-info">
                        <Row>
                            <Col>
                                <img src={availableMapsPins[this.props.store.retrieveThirdMap.map_index]} alt="helloWorld2" />
                            </Col>
                            <Col>
                                <Col>
                                    <Row>
                                        <a id="map-text">{availableMaps[this.props.store.retrieveThirdMap.map_index]}</a>
                                        <a id="score-text">{this.props.store.retrieveThirdMap.score.ct} : {this.props.store.retrieveThirdMap.score.t}</a>
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>);
    }
}

export default MapSelection;