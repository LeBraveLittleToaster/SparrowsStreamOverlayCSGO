import React, { Component } from 'react';
import EventEndRound from './events/EventEndRound';
import WebSocket from 'react-websocket';
import EventPlayerComparison from './events/EventPlayerComparison';

class EventRenderer extends Component {

    constructor(props) {
        super(props)
        this.state = { end_event: undefined, player_comparison_event: undefined }
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result)
        if(typeof result.type !== "undefined"){
            if(result.type === "end_round"){
                console.log("Triggering end_round event")
                this.setState({end_event: result.data})
                setTimeout(() => {
                    this.setState({
                        end_event: undefined
                    })
                }, 6000);
            }
            if(result.type === "player_comparison"){
                console.log("Triggering player_comparison event")
                this.setState({player_comparison_event: result.data})
                setTimeout(() => {
                    this.setState({
                        player_comparison_event: undefined
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
                {this.state.player_comparison_event !== undefined ? (
                    <EventPlayerComparison event_data={this.state.player_comparison_event}/>) 
                : 
                    (<div></div>) 
                }
                <WebSocket url='ws://localhost:8080/' onMessage={this.handleData.bind(this)}/>
            </div>
        );
    }
}

export default EventRenderer