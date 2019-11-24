import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
import WaitScreenInfoDisplay from './waitscreen/WaitScreenInfoDisplay.js'

const App = observer(class App extends Component {

  ws = new WebSocket('ws://localhost:8080/ws')

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("Connected")
    }

    this.ws.onmessage = evt => {
      const message = evt.data
      let msg = JSON.parse(message)
      console.log("Receiving [" + msg.type + "] type data");
      console.log(msg)
      if (msg.type === "init") {
        this.props.store.injectInitData(msg.data);
      } else if (msg.type === "broadcast_maps_update") {
        console.log("MAP_UPDATE: " + JSON.stringify(msg));
        this.props.store.injectInitData(msg);
      } else if(msg.type === "broadcast_timer_update"){
        console.log("TIMER_UPDATE: " + JSON.stringify(msg));
        this.props.store.setCountdown(msg.timer_millis);
      } else if(msg.type === "broadcast_teamnames_update"){
        console.log("Teamnames_update: " + msg.teamnames);
        this.props.store.setTeamnames(msg.teamnames.ct, msg.teamnames.t);
      } else if(msg.type === "broadcast_maps_setup_update"){
        console.log("Maps_Setup_update: " + msg.maps_setup);
        this.props.store.setMapsSetup(msg.maps_setup.amountOfMaps);
      }

      this.setState({
        text: message
      })
    }

    this.ws.onclose = () => {
      console.log("Disconnected")
    }
  }

  render() {
    return (
      <div>
        
        <img alt="missing" id="overlayimg" src="OverlaySparrowsV2.png"></img>
         
        <div id="overlayinfo">
          <WaitScreenInfoDisplay store={this.props.store} />
        </div>
      </div>
    );
  }
});

export default App;
