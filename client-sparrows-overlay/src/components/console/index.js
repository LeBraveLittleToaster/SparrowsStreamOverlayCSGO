import React, { Component } from 'react';
import MapSetupView from './MapSetupView';
import MapChangerView from './MapChangerView';
import TimerView from './TimerView';
import Teamnames from './Teamnames';


class Console extends Component {

    constructor(props) {
        super(props)
    }

    save() {
        console.log("TODO save status");
    }

    render() {

        return (
            <div>
                <h1> Mapselection </h1>
                <MapSetupView />
                <h2>Map 1</h2>
                <MapChangerView />
                <h2>Map 2</h2>
                <MapChangerView />
                <h2>Map 3</h2>
                <MapChangerView />

                <h1> Timer </h1>
                <TimerView />

                <h1>Teamnnames</h1>
                <Teamnames />

                <button onClick={this.save()}>Save</button>
            </div>
        );
    }
};

export default Console;