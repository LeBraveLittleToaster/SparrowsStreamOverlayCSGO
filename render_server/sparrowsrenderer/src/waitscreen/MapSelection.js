import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './WaitScreenInfoDisplay.scss';
import { availableMaps, availableMapsPins } from '../store/Store';
import { Row, Col } from 'reactstrap';

const MapSelection = observer(class MapSelection extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log("RENDER")
        return (<div id="maps_container">
            <Row>
                {this.props.store.retrieveFirstMap.isActive ? (
                    <Col id="col-spacer">
                        <div id="map-one-info">
                            <Row>
                                <Col>
                                    <img id="map-one-picture" src={availableMapsPins[this.props.store.retrieveFirstMap.map_index]} alt="helloWorld2" />
                                </Col>
                                <Col>
                                    <Col>
                                        <Row>

                                            <a id="score-text">{this.props.store.retrieveFirstMap.score.ct} : {this.props.store.retrieveFirstMap.score.t}</a>
                                            <a id="map-text">Map 1</a>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </div>

                    </Col>) : (<div></div>)
                }
                {this.props.store.retrieveSecondMap.isActive ? (
                    <Col id="col-spacer">
                        <div id="map-two-info">
                            <Row>
                                <Col>
                                    <img id="map-two-picture" src={availableMapsPins[this.props.store.retrieveSecondMap.map_index]} alt="helloWorld2" />
                                </Col>
                                <Col>
                                    <Col>
                                        <Row>

                                            <a id="score-text">{this.props.store.retrieveSecondMap.score.ct} : {this.props.store.retrieveSecondMap.score.t}</a>
                                            <a id="map-text">Map 2</a>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                    </Col>) : (<div></div>)
                }
                {this.props.store.retrieveThirdMap.isActive ? (
                    <Col id="col-spacer">
                        <div id="map-three-info">
                            <Row>
                                <Col>
                                    <img id="map-three-picture" src={availableMapsPins[this.props.store.retrieveThirdMap.map_index]} alt="helloWorld2" />
                                </Col>
                                <Col>
                                    <Col>
                                        <Row>
                                            <a id="score-text">{this.props.store.retrieveThirdMap.score.ct} : {this.props.store.retrieveThirdMap.score.t}</a>
                                            <a id="map-text">Map 3</a>

                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                    </Col>) : (<div></div>)
                }
            </Row>
        </div>);
    }
});

export default MapSelection;