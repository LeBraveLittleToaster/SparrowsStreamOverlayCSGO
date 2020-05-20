import React, { useState } from 'react';


const optionsBestOf = ["Best of 0","Best of 1", "Best of 2", "Best of 3", "Best of 4", "Best of 5"];

function MapSetupView(props) {

    const [amount_of_maps, set_amount_of_maps] = useState(props.value || 0);

    return (<div id="select_container">
        <label htmlFor="cars">Select amount of maps:</label>
        <select id="cars"
            value={optionsBestOf[amount_of_maps]}
            onChange={(e) => {
                set_amount_of_maps(e.target.selectedIndex)
                if (props.onChange !== null) {
                    props.onChange(e.target.selectedIndex);
                }
            }}
        >
            <option>{optionsBestOf[0]}</option>
            <option>{optionsBestOf[1]}</option>
            <option>{optionsBestOf[2]}</option>
            <option>{optionsBestOf[3]}</option>
            <option>{optionsBestOf[4]}</option>
            <option>{optionsBestOf[5]}</option>
        </select>
    </div>)
}


export default MapSetupView;