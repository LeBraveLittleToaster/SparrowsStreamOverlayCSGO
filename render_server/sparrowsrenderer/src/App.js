import React from 'react';
import './App.css';
import WorldRenderer from './waitscreen/WorldRenderer';
import WaitScreenInfoDisplay from './waitscreen/WaitScreenInfoDisplay.js'

function App() {
  return (
    <div id="gradientbg">
      <img id="overlayimg" src="OverlaySparrowsV2.png"></img>
      <div id="overlayinfo">
        <WaitScreenInfoDisplay/>
      </div>
      <div id="size_wrapper">
        <WorldRenderer/>
      </div>
    </div>
  );
}

export default App;
