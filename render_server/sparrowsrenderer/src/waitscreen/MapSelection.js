import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './WaitScreenInfoDisplay.scss';
import { availableMaps, availableMapsPins } from '../store/Store';
import { Container, Row, Col } from 'reactstrap';

const MapSelection = observer(class MapSelection extends Component {

    constructor(props) {
        super(props)
    }

    render() {
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
                                    <Container>
                                        <Col>
                                            <Row>

                                                <a id="score-text">{this.props.store.retrieveFirstMap.score.ct} : {this.props.store.retrieveFirstMap.score.t}</a>
                                                <a id="map-text">Map 1</a>
                                            </Row>
                                        </Col>
                                    </Container>
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
                                    <Container>
                                        <Col>
                                            <Row>

                                                <a id="score-text">{this.props.store.retrieveSecondMap.score.ct} : {this.props.store.retrieveSecondMap.score.t}</a>
                                                <a id="map-text">Map 2</a>
                                            </Row>
                                        </Col>
                                    </Container>
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
                                    <Container>
                                        <Col>
                                            <Row>
                                                <a id="score-text">{this.props.store.retrieveThirdMap.score.ct} : {this.props.store.retrieveThirdMap.score.t}</a>
                                                <a id="map-text">Map 3</a>
                                            </Row>
                                        </Col>
                                    </Container>
                                </Col>
                            </Row>
                        </div>
                    </Col>) : (
                        <div>
                            <Container>
                                <Col>
                                    <Row><a id="map-text-mode">Best of 2</a></Row>
                                    {this.props.store.retrieveFirstMap.map_index != 0 ? (
                                    <Row><a id="map-text-alternative">{availableMaps[this.props.store.retrieveFirstMap.map_index]} picked by {this.props.store.retrieveFirstMap.picked_by}</a></Row>
                                    ) : (<div></div>)}
                                    {this.props.store.retrieveSecondMap.map_index != 0 ? (
                                    <Row><a id="map-text-alternative">{availableMaps[this.props.store.retrieveSecondMap.map_index]} picked by {this.props.store.retrieveSecondMap.picked_by}</a></Row>
                                    ) : (<div></div>)}
                                </Col>
                            </Container>
                        </div>
                    )
                }
            </Row>
        </div>);
    }
});

export default MapSelection;