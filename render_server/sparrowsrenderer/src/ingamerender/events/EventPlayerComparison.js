import React,  {Component} from 'react';
import {merge, fadeIn, slideInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import './EventPlayerComparison.scss';

const textReveal = merge(fadeIn, slideInRight)

const styles = {
    textReveal: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(textReveal,'textReveal')
    }
}


class EventPlayerComparison extends Component{
    constructor(props){
        super(props)
        this.state = this.props.event_data;
    }

    componentWillMount(){
        
    }

    render() {
        return (
            <StyleRoot>
                    <div id="test" style={styles.textReveal}>
                        <a>LOL</a>
                    </div>
            </StyleRoot>
        );
    }
}

export default EventPlayerComparison;