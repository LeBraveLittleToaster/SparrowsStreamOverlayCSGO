import React, {Component} from 'react';
import './AdminConsole.scss'
import MapSelection from '../waitscreen/MapSelection';

class AdminConsole extends Component{

    ws = new WebSocket('ws://localhost:8080/ws')

    constructor(props){
        super(props)
        this.state = {
            text: "HelloWorld"
        }
    }

    componentDidMount(){
        this.ws.onopen = () => {
            console.log("Connected")
        }

        this.ws.onmessage = evt => {
            const message = evt.data
            this.setState({
                text: message
            })
        }

        this.ws.onclose= () => {
            console.log("Disconnected")
        }
    }



    render(){
        return (
            <div>
                <MapSelection socket={this.ws} timermillis={100000}/>
                <a>{this.state.text}</a>
            </div>
        );
    }
}
export default AdminConsole;