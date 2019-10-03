import React, {Component} from 'react';
import Countdown from 'react-countdown-now';

class MapSelection extends Component{

    constructor(props){
        super(props)
        this.state = {
            socket: props.socket
        }
    }

    componentDidMount(){
        this.state.socket.onmessage = evt => {
            console.log("COMPONENT: " + evt.data)
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.timermillis !== this.props.timermillis;
    }

    render() {
        console.log("Render is called")
        return (<div>
            <Countdown date={Date.now() + this.props.timermillis}/>
            </div>);
    }
}

export default MapSelection;