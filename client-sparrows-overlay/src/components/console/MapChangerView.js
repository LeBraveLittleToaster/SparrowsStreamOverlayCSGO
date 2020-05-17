import React, { Component } from 'react';

const options_map = ["cache", "cobblestone", "dust2", "inferno", "mirage", "nuke", "overpass", "train", "vertigo"];
const options_teams = ["left", "right"];


export default class MapChangerView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id_map: 0,
            id_pick: 0,
            score_left: 0,
            score_right: 0,
        }
    }

    componentDidMount() {
    }


    mapSelect(value) {
        this.setState({ id_map: value })
    }

    mapPickedBy(value) {
        this.setState({ id_pick: value })
    }

    scoreLeftChanged(value) {
        this.setState({ score_left: value })
    }
    scoreRightChanged(value) {
        this.setState({ score_right: value })
    }

    render() {
        let map_number = 1;

        let id_firstmap = this.state.id_firstmap;

        return (<div>

            <label htmlFor="maps">Select map:</label>

            <select id="maps"
                onChange={(e) => this.mapSelect(e.target.selectedIndex)}
                value={options_map[id_firstmap]}>
                <option>{options_map[0]}</option>
                <option>{options_map[1]}</option>
                <option>{options_map[2]}</option>
                <option>{options_map[3]}</option>
                <option>{options_map[4]}</option>
                <option>{options_map[5]}</option>
                <option>{options_map[6]}</option>
                <option>{options_map[7]}</option>
            </select>
            <div>
                <label htmlFor="quantity">Score Left:</label>
                <input type="number" id="quantity" name="quantity" min="0" max="100"
                    value={this.state.score_left}
                    onChange={(e) => this.scoreLeftChanged(e.target.value)} />
            </div>

            <div>
                <label htmlFor="quantity">Score Right:</label>
                <input type="number" id="quantity" name="quantity" min="0" max="100"
                    value={this.state.score_right}
                    onChange={(e) => this.scoreRightChanged(e.target.value)} />
            </div>
            <div>
                <label htmlFor="maps">Select which team picked first map:</label>
                <select id="maps"
                    onChange={(e) => this.mapPickedBy(e.target.selectedIndex)}
                    value={options_map[id_firstmap]}>

                    <option>{options_teams[0]}</option>
                    <option>{options_teams[1]}</option>
                </select>
            </div>


        </div>)
    }


}