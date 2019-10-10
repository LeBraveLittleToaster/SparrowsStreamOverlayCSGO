import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
import WorldRenderer from './waitscreen/WorldRenderer';
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
        this.props.store.adjustCountdown(msg.timer_millis);
      } else if(msg.type === "broadcast_teamnames_update"){
        console.log("Teamnames_update: " + msg.teamnames);
        this.props.store.adjustTeamnames(msg.teamnames.ct, msg.teamnames.t);
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
      <div id="gradientbg">
        
        <img alt="missing" id="overlayimg" src="OverlaySparrowsV2.png"></img>
         
        <div id="overlayinfo">
          <WaitScreenInfoDisplay store={this.props.store} />
        </div>
        
        <div id="size_wrapper">
          <WorldRenderer />
        </div>
        
      </div>
    );
  }
});

export default App;
