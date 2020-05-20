import React, { useState } from 'react';

var default_value = {
    team_name_left: "Sparrows",
    team_name_right: "Opponent"
}

function Teamnames(props) {

    const[value, set_value] = useState(props.value || default_value);

    let local_value = props.value || value;
    
    return (<div>
        <div>
            <label htmlFor="name_left">left Name: </label>
            <input type="text" name="name_left"
                value={local_value.team_name_left}
                onChange={(e) => {
                    let newvalue = { ...value, team_name_left: e.target.value };
                    set_value(newvalue)
                    if(typeof props.onChange !== "undefined"){
                        props.onChange(newvalue)
                    }
                }}
            />
        </div>
        <div>
            <label htmlFor="name_right">right Name: </label>
            <input type="text" name="name_right"
                value={local_value.team_name_right}
                onChange={(e) => {
                    let newvalue = { ...value, team_name_right: e.target.value };
                    set_value(newvalue)
                    if(typeof props.onChange !== "undefined"){
                        props.onChange(newvalue)
                    }
                }}
            />
        </div>
    </div>
    );

};

export default Teamnames;