import React, {Component} from 'react';
import './AdminConsole.scss'
import MapSelection from '../waitscreen/MapSelection';
import MapChangerView from './MapChangerView';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';


const AdminConsole = observer(class AdminConsole extends Component{

    ws = new WebSocket('ws://localhost:8080/ws')

    constructor(props){
        super(props)
        this.state = {
            text: "HelloWorld"
        }
        this.store = props.store;
    }

    componentDidMount(){
        this.ws.onopen = () => {
            console.log("Connected")
        }

        this.ws.onmessage = evt => {
            const message = evt.data
            let msg = JSON.parse(message)
            console.log(msg)
            if(msg.type === "init"){
                this.props.store.injectInitData(msg.data);
            }
            
            this.setState({
                text: message
            })
        }

        this.ws.onclose= () => {
            console.log("Disconnected")
        }
    }

    onSyncNeed = () => {
        console.log("SYNC")
        let store_state = {
            type: "maps_update", 
            maps: [
                this.props.store.retrieveFirstMap,
                this.props.store.retrieveSecondMap,
                this.props.store.retrieveThirdMap
            ]
        }
        console.log("SENDING: " + JSON.stringify(store_state))
        this.ws.send(JSON.stringify(store_state))
    }


    render(){
        const store = this.props.store;
        let firstMap = toJS(store.retrieveFirstMap);
        return (
            <div>
                <MapSelection socket={this.ws} timermillis={100000}/>
                <a>{this.state.text}</a><br/>
                <a>{firstMap.name}</a>
                <MapChangerView store={this.props.store} callback={this.onSyncNeed.bind()}/>
            </div>
        );
    }
});

export default AdminConsole;