import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import './WaitScreenInfoDisplay.scss';
import { availableMaps, availableMapsPins } from '../store/Store';
import { Row, Col } from 'reactstrap';

class MapSelection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            socket: props.socket
        }
    }

    render() {
        console.log("Render is called")
        return (<div id="maps_container">
            <Row>
                <Col id="col-spacer">
                    <div id="map-one-info">
                        <Row>
                            <Col>
                                <img src={availableMapsPins[this.props.maps[0]]} alt="helloWorld2" />
                            </Col>
                            <Col>
                                <Col>
                                    <Row id="vert">
                                        <a id="map-text">{availableMaps[this.props.maps[0]]}</a>
                                    </Row>
                                    <Row>
                                        <a id="score-text">{this.props.scores[0]}</a>
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
                                <img src={availableMapsPins[this.props.maps[1]]} alt="helloWorld2" />
                            </Col>
                            <Col>
                                <Col>
                                    <Row>
                                        <a id="map-text">{availableMaps[this.props.maps[1]]}</a>
                                        <a id="score-text">{this.props.scores[1]}</a>
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
                                <img src={availableMapsPins[this.props.maps[2]]} alt="helloWorld2" />
                            </Col>
                            <Col>
                                <Col>
                                    <Row>
                                        <a id="map-text">{availableMaps[this.props.maps[2]]}</a>
                                        <a id="score-text">{this.props.scores[2]}</a>
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