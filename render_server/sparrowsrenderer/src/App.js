import React from 'react';
import './App.css';
import WorldRenderer from './WorldRenderer';

function App() {
  return (
    <div id="gradientbg">
      <img id="overlayimg" src="OverlaySparrowsV2.png"></img>
      <div id="size_wrapper">
        <WorldRenderer/>
      </div>
    </div>
  );
}

export default App;
