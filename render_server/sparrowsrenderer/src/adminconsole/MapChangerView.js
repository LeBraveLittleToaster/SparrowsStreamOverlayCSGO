import React, { Component } from 'react';
import { toJS } from 'mobx';
import { FormGroup, Col, Row, Container, Label, Input } from 'reactstrap';
import './AdminConsole.scss';
import { availableMaps } from '../store/Store';


export default class MapChangerView extends Component {

    constructor(props) {
        super(props)
    }


    mapSelect(map_number, value) {
        console.log("Map " + map_number + " : " + value)
        this.adjustMap(map_number, value, undefined, undefined, undefined)
    }

    mapPickedBy(map_number, value) {
        console.log("Map " + map_number + " picked by: " + value)
        this.adjustMap(map_number, undefined, undefined, undefined, value)
    }

    scoreCtChanged(map_number, value) {
        console.log("Map " + map_number + " score ct: " + value)
        this.adjustMap(map_number, undefined, value, undefined, undefined)
    }

    scoreTChanged(map_number, value) {
        console.log("Map " + map_number + " score t: " + value)
        this.adjustMap(map_number, undefined, undefined, value, undefined)
    }

    adjustMap(map_number, map_index, score_ct, score_t, picked_by) {
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
                    <Container>

                        <Row>

                            <Col>
                                <h1>Map 1</h1>

                                <Label for="first_map_select">Select first map</Label>
                                <Input value={availableMaps[this.props.store.retrieveFirstMap.map_index]} onChange={(e) => this.mapSelect(0, e.target.selectedIndex)} type="select" name="select" id="first_map_select">
                                    <option>{availableMaps[0]}</option>
                                    <option>{availableMaps[1]}</option>
                                    <option>{availableMaps[2]}</option>
                                    <option>{availableMaps[3]}</option>
                                    <option>{availableMaps[4]}</option>
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
                                            value={this.props.store.retrieveFirstMap.score.ct}
                                            placeholder="Insert score for CT"
                                            onChange={(e) => this.scoreCtChanged(0, e.target.value)}
                                        />

                                    </Col>
                                    <Col>

                                        <Label for="first_map_score_t">Score T</Label>
                                        <Input
                                            type="number"
                                            name="number"
                                            min="0"
                                            step="1"
                                            value={this.props.store.retrieveFirstMap.score.t}
                                            id="first_map_score_t"
                                            placeholder="Insert score for T"
                                            onChange={(e) => this.scoreTChanged(0, e.target.value)}
                                        />

                                    </Col>
                                </Row>
                                <br />

                                <Label for="first_map_picked_by">Select which team picked first map</Label>
                                <Input onClick={(e) => this.mapPickedBy(0, e.target.value)} type="select" name="select" id="first_map_select">
                                    <option>Sparrows</option>
                                    <option>Opponent</option>
                                </Input>

                            </Col>
                            <Col>
                                <h1>Map 2</h1>

                                <Label for="second_map_select">Select second map</Label>
                                <Input value={availableMaps[this.props.store.retrieveSecondMap.map_index]} onChange={(e) => this.mapSelect(1, e.target.selectedIndex)} type="select" name="select" id="second_map_select">
                                    <option>{availableMaps[0]}</option>
                                    <option>{availableMaps[1]}</option>
                                    <option>{availableMaps[2]}</option>
                                    <option>{availableMaps[3]}</option>
                                    <option>{availableMaps[4]}</option>
                                </Input>

                                <br />
                                <Row>
                                    <Col>

                                        <Label for="second_map_score_ct">Score CT</Label>
                                        <Input
                                            type="number"
                                            name="number"
                                            min="0"
                                            step="1"
                                            id="second_map_score_ct"
                                            value={this.props.store.retrieveSecondMap.score.ct}
                                            placeholder="Insert score for CT"
                                            onChange={(e) => this.scoreCtChanged(1, e.target.value)}
                                        />

                                    </Col>
                                    <Col>

                                        <Label for="second_map_score_t">Score T</Label>
                                        <Input
                                            type="number"
                                            name="number"
                                            min="0"
                                            step="1"
                                            value={this.props.store.retrieveSecondMap.score.t}
                                            id="second_map_score_t"
                                            placeholder="Insert score for T"
                                            onChange={(e) => this.scoreTChanged(1, e.target.value)}
                                        />

                                    </Col>
                                </Row>

                                <br />

                                <Label for="second_map_picked_by">Select which team picked first map</Label>
                                <Input onClick={(e) => this.mapPickedBy(1, e.target.value)} type="select" name="select" id="second_map_select">
                                    <option>Sparrows</option>
                                    <option>Opponent</option>
                                </Input>

                            </Col>

                            <Col>
                                <h1>Map 3</h1>

                                <Label for="third_map_select">Select first map</Label>
                                <Input value={availableMaps[this.props.store.retrieveThirdMap.map_index]} onChange={(e) => this.mapSelect(2, e.target.selectedIndex)} type="select" name="select" id="first_map_select">
                                    <option>{availableMaps[0]}</option>
                                    <option>{availableMaps[1]}</option>
                                    <option>{availableMaps[2]}</option>
                                    <option>{availableMaps[3]}</option>
                                    <option>{availableMaps[4]}</option>
                                </Input>

                                <br />
                                <Row>
                                    <Col>

                                        <Label for="third_map_score_ct">Score CT</Label>
                                        <Input
                                            type="number"
                                            name="number"
                                            min="0"
                                            step="1"
                                            id="third_map_score_ct"
                                            value={this.props.store.retrieveThirdMap.score.ct}
                                            placeholder="Insert score for CT"
                                            onChange={(e) => this.scoreCtChanged(2, e.target.value)}
                                        />

                                    </Col>
                                    <Col>

                                        <Label for="third_map_score_t">Score T</Label>
                                        <Input
                                            type="number"
                                            name="number"
                                            min="0"
                                            step="1"
                                            value={this.props.store.retrieveThirdMap.score.t}
                                            id="third_map_score_t"
                                            placeholder="Insert score for T"
                                            onChange={(e) => this.scoreTChanged(2, e.target.value)}
                                        />

                                    </Col>
                                </Row>
                                <br />

                                <Label for="third_map_picked_by">Select which team picked first map</Label>
                                <Input onClick={(e) => this.mapPickedBy(2, e.target.value)} type="select" name="select" id="third_map_select">
                                    <option>Sparrows</option>
                                    <option>Opponent</option>
                                </Input>

                            </Col>

                        </Row>
                    </Container>
                </FormGroup>
            </div>
        );
    }


}