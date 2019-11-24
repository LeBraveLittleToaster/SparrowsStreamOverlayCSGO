import React, { Component } from 'react';
import { merge, fadeIn, slideInRight,fadeOutLeft ,slideOutLeft, bounceInDown, bounceInLeft, zoomOutRight, flash } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { Container } from 'reactstrap';
import './EventEndRound.scss'
import fadeOut from 'react-animations/lib/fade-out';
const mergeStyles = {
    faderino: {
        animation: 'x 4s',
        animationName: Radium.keyframes(fadeIn, 'faderino')
    }
}

const picRevealV2 = merge(fadeIn, flash)
const picHide = merge(fadeOut, flash)

const styles = {
    picReveal: {
        animation: 'x .2s',
        animationName: Radium.keyframes(picRevealV2, 'picReveal')
    },
    picHide: {
        animation: 'x .2s',
        animationName: Radium.keyframes(picHide, 'picHide')
    }
}


class EventEndRound extends Component {
    constructor(props) {
        super(props)
        this.state = {
            winning_team_name: props.winning_team_name,
            hasCtWon: this.props.hasCtWon,
            animation: styles.picReveal
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({ animation: styles.picHide });
        }, (this.props.fade_timeout_millis - 200));
    }

    render() {
        return (
            <StyleRoot>
                <div style={this.state.animation}>
                <Container>
                    <div id="text-bottom">
                        <h2 className="glitch" data-text="WON">WON</h2>
                    </div>

                    <div id="teamlogo">
                        {this.state.hasCtWon ? (
                            <img alt="Could not load pic" id="pic" src={this.props.store.getTeamPictures.ctUrl} />
                        ) : (
                            <img alt="Could not load pic"  id="pic" src={this.props.store.getTeamPictures.tUrl} />
                        )}
                    </div>

                    <div id="glitch_container">
                        <div id="top-text">
                            <h1 className="glitch" data-text={this.state.winning_team_name}>{this.state.winning_team_name}</h1>
                        </div>

                    </div>

                </Container>
                </div>
            </StyleRoot>
        );
    }
}

export default EventEndRound;