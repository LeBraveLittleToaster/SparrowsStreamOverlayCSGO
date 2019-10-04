import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import "./waitscreen/WaitScreenInfoDisplay.scss"


const Completionist = () => <a>STREAM LIVE</a>;
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <a>Stream starts in {hours}:{minutes}:{seconds}</a>;
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
            <div id="up-middle-info">
                <Countdown date={Date.now() + this.props.timermillis} renderer={renderer}></Countdown>
            </div>
        );
    };
}