import React, { Component } from 'react';

class Teamnames extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name_left: "Sparrows",
            name_right: "Opponent"
        }
    }

    name_left_change(value) {
        this.setState({ name_left: value })
    }

    name_right_change(value) {
        this.setState({ name_right: value })
    }

    render() {
        return (<div>
            <div>
                <label for="name_left">left Name: </label>
                <input type="text" name="name_left"
                    value={this.state.name_left}
                    onChange={(e) => this.name_left_change(e.target.value)}
                />
            </div>
            <div>
                <label for="name_right">right Name: </label>
                <input type="text" name="name_right"
                    value={this.state.name_right}
                    onChange={(e) => this.name_right_change(e.target.value)}
                />
            </div>
        </div>
        );
    }
};

export default Teamnames;