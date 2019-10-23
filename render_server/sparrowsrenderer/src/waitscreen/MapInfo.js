import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'reactstrap';
import { availableMaps, availableMapsPins } from '../store/Store';

const MapInfo = observer(class MapInfo extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row>
                <Col>
                    <img id="map-picture" src={availableMapsPins[this.props.map.map_index]} alt="helloWorld1" />
                </Col>
                <Col>
                    <Container>
                        <Col>
                            <Row>
                                <a id="score-text">{this.props.map.score.ct} : {this.props.map.score.t}</a>
                            </Row>
                            <Row>
                                <a id="map-text">Map 1</a>
                            </Row>
                        </Col>
                    </Container>
                </Col>
            </Row>
        );
    }
});

export default MapInfo;