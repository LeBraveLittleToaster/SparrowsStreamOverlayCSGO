import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import "./waitscreen/WaitScreenInfoDisplay.scss"


const Completionist = () => <a>STREAM LIVE</a>;
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else{
        console.log(hours)
        console.log(minutes)
        console.log(seconds)
        let out = "";
        if(hours > 0){
            out += hours.toString() + "h ";
        }
        if(minutes > 0){
            out += minutes.toString() + "m ";
        }
        out += seconds.toString() + "s";
        console.log(out)
        // Render a countdown
        return <a id="countdown-font">Stream starts in {out}</a>;
    }
};

export default class CountdownWrapper extends Component {

    constructor(props){
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.isNetworkUpdate;
    }

    render() {
        return (            
            <Countdown date={Date.now() + this.props.timermillis} renderer={renderer}></Countdown>
        );
    };
}