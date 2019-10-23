import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './WaitScreenInfoDisplay.scss';
import { Container, Row, Col } from 'reactstrap';
import MapInfo from './MapInfo';
import BestOf from './BestOf';

const MapSelection = observer(class MapSelection extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log("Updating map: " + this.props.store.getMapsSetup.amountOfMaps)
        return (<div id="maps_container">
            {this.props.store.getMapsSetup.amountOfMaps === 1 ?
                (<Row>
                    <Col id="two-row">
                        <MapInfo map={this.props.store.getFirstMap} />
                    </Col>
                    <Col>
                        <BestOf count={1} maps={[this.props.store.getFirstMap]}/>
                    </Col>
                </Row>)
                :
                (<div></div>)
            }
            {this.props.store.getMapsSetup.amountOfMaps === 2 ?
                (<Row>
                    <Col id="three-row">
                        <MapInfo map={this.props.store.getFirstMap} />
                    </Col>
                    <Col id="three-row">
                        <MapInfo map={this.props.store.getSecondMap} />
                    </Col>
                    <Col id="three-row">
                        <BestOf count={2} maps={[this.props.store.getFirstMap, this.props.store.getSecondMap]}/>
                    </Col>
                </Row>)
                :
                (<div></div>)
            }
            {this.props.store.getMapsSetup.amountOfMaps === 3 ?
                (<Row>
                    <Col id="three-row">
                        <MapInfo map={this.props.store.getFirstMap} />
                    </Col>
                    <Col id="three-row">
                        <MapInfo map={this.props.store.getSecondMap} />
                    </Col>
                    <Col id="three-row">
                        <MapInfo map={this.props.store.getThirdMap} />
                    </Col>
                </Row>)
                :
                (<div></div>)
            }
        </div>);
    }
});

export default MapSelection;