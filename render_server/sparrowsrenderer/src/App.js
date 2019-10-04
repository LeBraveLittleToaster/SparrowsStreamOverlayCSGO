import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './App.css';
import WorldRenderer from './waitscreen/WorldRenderer';
import WaitScreenInfoDisplay from './waitscreen/WaitScreenInfoDisplay.js'

const App = observer(class App extends Component {
  constructor(props) {
    super(props);
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
