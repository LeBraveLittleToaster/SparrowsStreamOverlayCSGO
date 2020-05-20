import React, { useState } from 'react';
import WaitScreenInfoDisplay from './WaitScreenInfoDisplay.js';

var default_value = {
  "selected_config_uuid": "495762cd-c230-4260-801b-440367866220",
  "steam_api_key": null,
  "data": [
      {
          "uuid": "495762cd-c230-4260-801b-440367866220",
          "schema": "csgo",
          "mapselection": {
              "amount_of_maps": 0,
              "maps": [],
              "begin": "2020-05-18 11:21",
              "team_name_left": "left",
              "team_name_right": "right"
          }
      }
  ]
};


function Waiting(props) {

  const[value, set_value] = useState(props.value || default_value);
  let local_value = props.value || value;

  return (
    <div>
      <div>
        <WaitScreenInfoDisplay 
          value={local_value}
          onChange={(e) => {
            let newvalue = e;
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

export default Waiting;