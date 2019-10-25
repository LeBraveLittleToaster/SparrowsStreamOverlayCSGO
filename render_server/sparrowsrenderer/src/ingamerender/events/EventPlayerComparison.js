import React, { Component } from 'react';
import { merge, fadeIn, slideInRight, slideOutLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { Row, Col, Container } from 'reactstrap';

import './EventPlayerComparison.scss';
import fadeOutLeft from 'react-animations/lib/fade-out-left';

const textReveal = merge(fadeIn, slideInRight)
const textHide = merge(fadeOutLeft, slideOutLeft)

const styles = {
    textReveal: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(textReveal, 'textReveal')
    },
    textHide: {
        animation: 'x 1s',
        animationName: Radium.keyframes(textHide, 'textHide')
    }
}


class EventPlayerComparison extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.event_data,
            animation: styles.textReveal
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({animation : styles.textHide});
        }, (this.props.fade_timeout_millis - 1000));
    }

    render() {
        return (
            <StyleRoot>
                <div id="popup-main" style={this.state.animation}>
                    <Container id="full-extend">
                        <Row id="full-extend">
                            <Col xs="5" id="full-extend">
                                <p style={this.state.animation} id="playername_ct">{this.state.data.name_ct}</p>
                                <p style={this.state.animation} id="teamname_ct">{this.state.data.team_ct}</p>
                                <hr/>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <p style={this.state.animation} id="stat-header">Kills</p>
                                                <p style={this.state.animation}id="stat-value">{this.state.data.score_ct.kills}</p>
                                            </Row>
                                            <Row>
                                                <p style={this.state.animation}id="stat-header">Assists</p>
                                                <p style={this.state.animation}id="stat-value">{this.state.data.score_ct.assists}</p>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <p style={this.state.animation}id="stat-header">Deaths</p>
                                                <p style={this.state.animation}id="stat-value">{this.state.data.score_ct.deaths}</p>
                                            </Row>
                                            <Row>
                                                <p style={this.state.animation}id="stat-header">ADR</p>
                                                <p style={this.state.animation}id="stat-value">{this.state.data.score_ct.adr}</p>
                                            </Row>
                                        </Col>
                                    </Row>
                                    
                                        <img src={this.props.store.getTeamPictures.ctUrl} id="bg_pic_ct" />
                                    
                                </Container>
                            </Col>
                            <Col xs="2">
                            </Col>
                            <Col xs="5" id="full-extend">
                            <p style={this.state.animation} id="playername_ct">{this.state.data.name_t}</p>
                                <p style={this.state.animation} id="teamname_ct">{this.state.data.team_t}</p>
                                <hr/>
                                <Container>
                                <Row>
                                        <Col>
                                            <Row>
                                                <p style={this.state.animation}id="stat-header">Kills</p>
                                                <p style={this.state.animation}id="stat-value">{this.state.data.score_t.kills}</p>
                                            </Row>
                                            <Row>
                                                <p style={this.state.animation}id="stat-header">Assists</p>
                                                <p style={this.state.animation}id="stat-value">{this.state.data.score_t.assists}</p>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <p style={this.state.animation}id="stat-header">Deaths</p>
                                                <p style={this.state.animation}id="stat-value">{this.state.data.score_t.deaths}</p>
                                            </Row>
                                            <Row>
                                                <p style={this.state.animation}id="stat-header">ADR</p>
                                                <p style={this.state.animation}id="stat-value">{this.state.data.score_t.adr}</p>
                                            </Row>
                                        </Col>
                                    </Row>
                                    
                                        <img src={this.props.store.getTeamPictures.tUrl} id="bg_pic_t" />
                                    
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </StyleRoot>
        );
    }
}

export default EventPlayerComparison;