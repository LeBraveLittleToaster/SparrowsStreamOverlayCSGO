import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'reactstrap';
import { availableMaps, availableMapsPins } from '../store/Store';
import './WaitScreenInfoDisplay.scss';



const BestOf = observer(class BestOf extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.count)
        return (
            <Container>
                <Col>

                    <Row>
                        <a id="map-text-mode">Best of {this.props.count}</a>
                    </Row>
                    {this.props.count === 1 ? (
                        <Row><a id="map-text-alternative">{availableMaps[this.props.maps[0].map_index]} picked by {this.props.maps[0].picked_by}</a></Row>)
                        :
                        (<Row></Row>)}
                    {this.props.count === 2 ? (
                        <div>
                            <Row><a id="map-text-alternative">{availableMaps[this.props.maps[0].map_index]} picked by {this.props.maps[0].picked_by}</a></Row>
                            <Row><a id="map-text-alternative">{availableMaps[this.props.maps[1].map_index]} picked by {this.props.maps[1].picked_by}</a></Row>
                        </div>)
                        :
                        (<Row></Row>)}
                    {/*
                    {this.props.map.map_index != 0 ? (
                        <Row><a id="map-text-alternative">{availableMaps[this.props.store.getFirstMap.map_index]} picked by {this.props.store.getFirstMap.picked_by}</a></Row>
                    ) : (<div></div>)}
                    {this.props.store.getSecondMap.map_index != 0 ? (
                        <Row><a id="map-text-alternative">{availableMaps[this.props.store.getSecondMap.map_index]} picked by {this.props.store.getSecondMap.picked_by}</a></Row>
                    ) : (<div></div>)}
                    */}
                </Col>
            </Container>);
    }
});

export default BestOf;