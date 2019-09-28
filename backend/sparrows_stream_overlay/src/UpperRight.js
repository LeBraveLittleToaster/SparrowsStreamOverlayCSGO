import React, { Component } from 'react';
import SVGUtil from './Util';

const UpperR = (props) => (
    <polygon points={SVGUtil.arrayToPointString([this.state.width,0, this.state.width,200, this.state.width - 200,200 , this.state.width - 300,0])} />
  );

class Overlay extends Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }


  render() {
    return (
      <div>
        <svg>
          <UpperR/>
        </svg>
      </div>
    );
  }
}

export default Overlay;
