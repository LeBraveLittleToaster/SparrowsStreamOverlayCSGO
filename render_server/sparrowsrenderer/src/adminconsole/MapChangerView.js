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
                    <Label for="first_map_select">Select first map</Label>
                    <Input value={availableMaps[this.props.store.retrieveFirstMap.map_index]} onChange={(e) => this.mapSelect(0, e.target.selectedIndex)} type="select" name="select" id="first_map_select">
                        <option>{availableMaps[0]}</option>
                        <option>{availableMaps[1]}</option>
                        <option>{availableMaps[2]}</option>
                        <option>{availableMaps[3]}</option>
                        <option>{availableMaps[4]}</option>
                    </Input>
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
                    <Label for="first_map_picked_by">Select which team picked first map</Label>
                    <Input onClick={(e) => this.mapPickedBy(0, e.target.value)} type="select" name="select" id="first_map_select">
                        <option>Sparrows</option>
                        <option>Opponent</option>
                    </Input>

                    <Label for="first_map_select">Select first map</Label>
                    <Input value={availableMaps[this.props.store.retrieveFirstMap.map_index]} onChange={(e) => this.mapSelect(0, e.target.selectedIndex)} type="select" name="select" id="first_map_select">
                        <option>{availableMaps[0]}</option>
                        <option>{availableMaps[1]}</option>
                        <option>{availableMaps[2]}</option>
                        <option>{availableMaps[3]}</option>
                        <option>{availableMaps[4]}</option>
                    </Input>
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
                    <Label for="first_map_picked_by">Select which team picked first map</Label>
                    <Input onClick={(e) => this.mapPickedBy(0, e.target.value)} type="select" name="select" id="first_map_select">
                        <option>Sparrows</option>
                        <option>Opponent</option>
                    </Input>

                    <Label for="first_map_select">Select first map</Label>
                    <Input value={availableMaps[this.props.store.retrieveFirstMap.map_index]} onChange={(e) => this.mapSelect(0, e.target.selectedIndex)} type="select" name="select" id="first_map_select">
                        <option>{availableMaps[0]}</option>
                        <option>{availableMaps[1]}</option>
                        <option>{availableMaps[2]}</option>
                        <option>{availableMaps[3]}</option>
                        <option>{availableMaps[4]}</option>
                    </Input>
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

                    <Label for="first_map_picked_by">Select which team picked first map</Label>
                    <Input onClick={(e) => this.mapPickedBy(0, e.target.value)} type="select" name="select" id="first_map_select">
                        <option>Sparrows</option>
                        <option>Opponent</option>
                    </Input>




                </FormGroup>
            </div>
        );
    }


}