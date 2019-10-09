import React, {Component} from 'react';
import {observer} from 'mobx-react';

const TimerView = observer(class TimerView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(<div></div>);
    }
});

export default TimerView;