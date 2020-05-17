import React, { Component } from 'react';
import WaitScreenInfoDisplay from './WaitScreenInfoDisplay.js'

class Waiting extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>        
        <div>
          <WaitScreenInfoDisplay />
        </div>
      </div>
    );
  }
};

export default Waiting;