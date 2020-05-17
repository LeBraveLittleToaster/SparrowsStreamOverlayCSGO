import React, { Component } from 'react';

const optionsBestOf = ["Best of 1", "Best of 2", "Best of 3", "Best of 4", "Best of 5"];

class MapSetupView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 0
        }
        this.store = props.store;
    }

    bestOfSelect(value) {
        this.setState({ id: value });
    }

    render() {
        let index = this.state.id;
        return (<div id="select_container">
            <label htmlFor="cars">Select amount of maps:</label>
            <select id="cars"
                onChange={(e) => this.bestOfSelect(e.target.selectedIndex)}
                value={optionsBestOf[index]}
            >
                <option>{optionsBestOf[0]}</option>
                <option>{optionsBestOf[1]}</option>
                <option>{optionsBestOf[2]}</option>
                <option>{optionsBestOf[3]}</option>
                <option>{optionsBestOf[4]}</option>
            </select>
        </div>)
    }
};

export default MapSetupView;