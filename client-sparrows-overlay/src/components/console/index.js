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
        let data = this.props.data;
        let config = null;
        let number = 0;
        if(data !== null){
            let uuid = this.props.data.selected_config_uuid;
            config = data.data.find(foo => foo.uuid == uuid);   
        }

        

        return (
            <div>
                <p> {JSON.stringify(data)}</p>
                <p> {JSON.stringify(config)}</p>
                <h1> Mapselection </h1>
                {config !== null && <MapSetupView amount_of_maps={config.mapselection.amount_of_maps-1}/>}
               

                {config !== null && config.mapselection.maps.map((value, index) => {
                    return (<div>
                        <h2> Map {index+1} </h2>
                        <MapChangerView />
                    </div>)
                })}

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