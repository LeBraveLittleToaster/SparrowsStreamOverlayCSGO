import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FormGroup, Col, Row, CustomInput, Label, Input } from 'reactstrap';

const optionsBestOf = ["Best of 1", "Best of 2", "Best of 3", "Best of 4", "Best of 5"];

const MapSetupView = observer(class MapSetupView extends Component{
    constructor(props){
        super(props);
    }

    bestOfSelect(value){
        console.log("Best of selected, index=" + value + " | store value=" + (value + 1 ));
        this.props.store.setMapsSetup(value + 1)
        this.props.callback();
    }

    render(){
        let index = this.props.store.getMapsSetup.amountOfMaps - 1;
        return (<div id="select_container">
            <Label for="best_of">Select amount of maps</Label>
                    <Input 
                        value={optionsBestOf[index]}
                        onChange={(e) => this.bestOfSelect(e.target.selectedIndex)} 
                        type="select" 
                        name="select_me" 
                        id="best_of">
                            <option>{optionsBestOf[0]}</option>
                            <option>{optionsBestOf[1]}</option>
                            <option>{optionsBestOf[2]}</option>
                            <option disabled>{optionsBestOf[3]}</option>
                            <option disabled>{optionsBestOf[4]}</option>
                    </Input>
        </div>);
    }
});

export default MapSetupView;