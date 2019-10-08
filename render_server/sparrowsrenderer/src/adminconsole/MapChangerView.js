import React, { Component } from 'react';
import { toJS } from 'mobx';
import { FormGroup, Col, Row, Container, Label, Input } from 'reactstrap';
import './AdminConsole.scss';
import { availableMaps } from '../store/Store';


export default class MapChangerView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            map_number: this.props.map_number,
            map: { map_index: 0, score: { ct: 0, t: 0 }, picked_by: "Loading" }
        }
    }


    mapSelect(value) {
        console.log("Map " + this.state.map_number + " : " + value)
        this.adjustMap(value, undefined, undefined, undefined)
        let map = { ...this.state.map }
        map.map_index = value;
        this.setState({ map })
    }

    mapPickedBy(value) {
        console.log("Map " + this.state.map_number + " picked by: " + value)
        this.adjustMap(undefined, undefined, undefined, value)
        let map = { ...this.state.map }
        map.picked_by = value;
        this.setState({ map })
    }

    scoreCtChanged(value) {
        console.log("Map " + this.state.map_number + " score ct: " + value)
        this.adjustMap(undefined, value, undefined, undefined)
        let map = { ...this.state.map }
        map.score.ct = value;
        this.setState({ map })
    }

    scoreTChanged(value) {
        console.log("Map " + this.state.map_number + " score t: " + value)
        this.adjustMap(undefined, undefined, value, undefined)
        let map = { ...this.state.map }
        map.score.t = value;
        this.setState({ map })
    }

    adjustMap(map_index, score_ct, score_t, picked_by) {
        let map_number = this.state.map_number;
        if (map_number === 0) {
            this.props.store.adjustFirstMap(map_index, score_ct, score_t, picked_by);
        } else if (map_number === 1) {
            this.props.store.adjustSecondMap(map_index, score_ct, score_t, picked_by);
        } else if (map_number === 2) {
            this.props.store.adjustThirdMap(map_index, score_ct, score_t, picked_by);
        }
        this.props.callback();
    }

    render() {
        return (
            <div id="select_container">
                <FormGroup>

                    <h1>Map {this.props.map_number}</h1>

                    <Label for="first_map_select">Select first map</Label>
                    <Input value={availableMaps[this.state.map.map_index]} onChange={(e) => this.mapSelect(e.target.selectedIndex)} type="select" name="select" id="first_map_select">
                        <option>{availableMaps[0]}</option>
                        <option>{availableMaps[1]}</option>
                        <option>{availableMaps[2]}</option>
                        <option>{availableMaps[3]}</option>
                        <option>{availableMaps[4]}</option>
                        <option>{availableMaps[5]}</option>
                        <option>{availableMaps[6]}</option>
                    </Input>

                    <br />
                    <Row>
                        <Col>
                            <Label for="first_map_score_ct">Score CT</Label>
                            <Input
                                type="number"
                                name="number"
                                min="0"
                                step="1"
                                id="first_map_score_ct"
                                value={this.state.map.score.ct}
                                placeholder="Insert score for CT"
                                onChange={(e) => this.scoreCtChanged(e.target.value)}
                            />
                        </Col>
                        <Col>

                            <Label for="first_map_score_t">Score T</Label>
                            <Input
                                type="number"
                                name="number"
                                min="0"
                                step="1"
                                value={this.state.map.score.t}
                                id="first_map_score_t"
                                placeholder="Insert score for T"
                                onChange={(e) => this.scoreTChanged(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br />

                    <Label for="first_map_picked_by">Select which team picked first map</Label>
                    <Input onClick={(e) => this.mapPickedBy(e.target.value)} type="select" name="select" id="first_map_select">
                        <option>Sparrows</option>
                        <option>Opponent</option>
                    </Input>
                </FormGroup>
            </div>
        );
    }


}