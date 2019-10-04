import React,  {Component} from 'react';
import './EventEndRound.scss'


class EventEndRound extends Component{
    constructor(props){
        super(props)
        this.state = {
            winning_team_name: props.winning_team_name
        }
    }

    componentWillMount(){
        
    }

    render() {
        return (
            <div id="glitch_container">
                <div id="top-text">
                    <h1 className="glitch" data-text={this.state.winning_team_name}>{this.state.winning_team_name}</h1>
                </div>
                <div id="text-bottom">
                    <h2 className="glitch" data-text="WON">WON</h2>
                </div>
            </div>
        );
    }
}

export default EventEndRound;