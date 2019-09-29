import React, { Component } from 'react';
import EventEndRound from './EventEndRound.js';
import WebSocket from 'react-websocket';

class EventRenderer extends Component {

    constructor(props) {
        super(props)
        this.state = { end_event: undefined }
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result)
        if(typeof result.type !== "undefined"){
            if(result.type === "end_round"){
                this.setState({end_event: result.data})
                setTimeout(() => {
                    this.setState({
                        end_event: undefined
                    })
                }, 6000);
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.end_event !== undefined ? (
                    <EventEndRound winning_team_name={this.state.end_event.winning_team_name}/>)
                :
                    (<div></div>)
                }
                <WebSocket url='ws://localhost:8080/' onMessage={this.handleData.bind(this)}/>
            </div>
        );
    }
}

export default EventRenderer