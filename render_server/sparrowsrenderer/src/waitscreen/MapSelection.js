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
                        <a id="map_text">{availableMaps[this.props.maps[0]]}</a>
                        <img src={availableMapsPins[this.props.maps[0]]} alt="helloWorld2"/>
                    </div>

                </Col>
                <Col id="col-spacer">
                    <div id="map-two-info">
                        <a id="map_text">{availableMaps[this.props.maps[1]]}</a>
                        <img src={availableMapsPins[this.props.maps[1]]} alt="helloWorld2"/>
                    </div>
                </Col>
                <Col id="col-spacer">
                    <div id="map-three-info">
                        <a id="map_text">{availableMaps[this.props.maps[2]]}</a>
                        <img src={availableMapsPins[this.props.maps[2]]} alt="helloWorld2"/>
                    </div>
                </Col>
            </Row>
        </div>);
    }
}

export default MapSelection;