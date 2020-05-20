import React, { useState } from 'react';

const options_map = ["cache", "cobblestone", "dust2", "inferno", "mirage", "nuke", "overpass", "train", "vertigo"];
const options_teams = ["left", "right"];

const default_value = {
    "map_name": "cache",
    "score_left": 3,
    "score_right": 1,
    "pick_by": "left"
}

function MapChangerView(props) {

    const [value, set_value] = useState(props.value || default_value);

    let local_value = props.value || value;

    return (<div>

        <label htmlFor="maps">Select map:</label>

        <select id="maps"
            value={local_value.map_name}
            onChange={(e) => {
                let new_value = { ...value, map_name: options_map[e.target.selectedIndex] };
                set_value(new_value)
                if (props.onChange !== null) {
                    props.onChange(new_value)
                }
            }}
        >
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
                value={local_value.score_left}
                onChange={(e) =>{
                    let newvalue = { ...value, score_left: e.target.value };
                    set_value(newvalue)
                    if (props.onChange !== null) {
                        props.onChange(newvalue)
                    }
                }} />
        </div>

        <div>
            <label htmlFor="quantity">Score Right:</label>
            <input type="number" id="quantity" name="quantity" min="0" max="100"
                value={local_value.score_right}
                onChange={(e) => {
                    let newvalue = { ...value, score_right: e.target.value };
                    set_value(newvalue)
                    if (props.onChange !== null) {
                        props.onChange(newvalue)
                    }
                }} />
        </div>
        <div>
            <label htmlFor="maps">Select which team picked first map:</label>
            <select id="maps"
                value={local_value.pick_by}
                onChange={(e) => {
                    let newvalue = { ...value, pick_by: options_teams[e.target.selectedIndex] };
                    set_value(newvalue)
                    if (props.onChange !== null) {
                        props.onChange(newvalue)
                    }
                }}
            >
                <option>{options_teams[0]}</option>
                <option>{options_teams[1]}</option>
            </select>
        </div>


    </div>)
}



export default MapChangerView;