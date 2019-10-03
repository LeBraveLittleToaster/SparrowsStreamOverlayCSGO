import React, { Component } from 'react';
import './WaitScreenInfoDisplay.scss';
import CountdownWrapper from '../CountdownWrapper';



class WaitScreenInfoDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timermillis: 100000
        }
    }



    render() {
        return (
            <div id="container">
                <div id="up-left-info">

                </div>

                <CountdownWrapper isNetworkUpdate={this.props.isNetworkUpdate} timermillis={this.state.timermillis}/>

                <div id="up-right-info">

                </div>

                <div id="mid-left-info">

                </div>
                <div id="mid-left-picture">

                </div>

                <div id="mid-right-info">

                </div>

                <div id="mid-right-picture">

                </div>



                <div id="map-one-info">

                </div>

                <div id="map-two-info">

                </div>
                <div id="ma-three-info">

                </div>

            </div>
        );
    }
}

export default WaitScreenInfoDisplay;