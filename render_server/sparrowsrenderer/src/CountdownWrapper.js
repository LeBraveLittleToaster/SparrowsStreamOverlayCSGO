import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Countdown from 'react-countdown-now';
import "./waitscreen/WaitScreenInfoDisplay.scss"


const Completionist = () => <a id="countdown-font">STREAM IS LIVE</a>;
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else{
        let out = "";
        if(hours > 0){
            out += hours.toString() + "h ";
        }
        if(minutes > 0){
            out += minutes.toString() + "m ";
        }
        out += seconds.toString() + "s";
        // Render a countdown
        return <a id="countdown-font">Stream starts in {out}</a>;
    }
};

const CountdownWrapper = observer(class CountdownWrapper extends Component {

    constructor(props){
        super(props)
    }
    
    render() {
        console.log("LOL" + Date.now().toString())
        let date = Date.now() + this.props.store.retrieveCountdown.initValue;
        return (            
            <Countdown date={date} renderer={renderer} autoStart={true}/>
        );
    };
});

export default CountdownWrapper;