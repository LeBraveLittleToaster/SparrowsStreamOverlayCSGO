import React, { Component } from 'react';
import { merge, fadeIn, slideInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { Row, Col, Container } from 'reactstrap';

import './EventPlayerComparison.scss';

const textReveal = merge(fadeIn, slideInRight)

const styles = {
    textReveal: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(textReveal, 'textReveal')
    }
}


class EventPlayerComparison extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.event_data;
    }

    componentWillMount() {

    }

    render() {
        return (
            <StyleRoot>
                <div id="popup-main" style={styles.textReveal}>
                    <Container id="full-extend">
                        <Row id="full-extend">
                            <Col xs="5" id="full-extend">
                                <p style={styles.textReveal} id="playername_ct">{this.state.name_ct}</p>
                                <p style={styles.textReveal} id="teamname_ct">{this.state.team_ct}</p>
                                <hr/>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <p style={styles.textReveal} id="stat-header">Kills</p>
                                                <p style={styles.textReveal}id="stat-value">{this.state.score_ct.kills}</p>
                                            </Row>
                                            <Row>
                                                <p style={styles.textReveal}id="stat-header">Assists</p>
                                                <p style={styles.textReveal}id="stat-value">{this.state.score_ct.assists}</p>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <p style={styles.textReveal}id="stat-header">Deaths</p>
                                                <p style={styles.textReveal}id="stat-value">{this.state.score_ct.deaths}</p>
                                            </Row>
                                            <Row>
                                                <p style={styles.textReveal}id="stat-header">ADR</p>
                                                <p style={styles.textReveal}id="stat-value">{this.state.score_ct.adr}</p>
                                            </Row>
                                        </Col>
                                    </Row>
                                    
                                        <img src={this.props.store.getTeamPictures.ctUrl} id="bg_pic_ct" />
                                    
                                </Container>
                            </Col>
                            <Col xs="2">
                            </Col>
                            <Col xs="5" id="full-extend">
                            <p style={styles.textReveal} id="playername_ct">{this.state.name_t}</p>
                                <p style={styles.textReveal} id="teamname_ct">{this.state.team_t}</p>
                                <hr/>
                                <Container>
                                <Row>
                                        <Col>
                                            <Row>
                                                <p style={styles.textReveal}id="stat-header">Kills</p>
                                                <p style={styles.textReveal}id="stat-value">{this.state.score_t.kills}</p>
                                            </Row>
                                            <Row>
                                                <p style={styles.textReveal}id="stat-header">Assists</p>
                                                <p style={styles.textReveal}id="stat-value">{this.state.score_t.assists}</p>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <p style={styles.textReveal}id="stat-header">Deaths</p>
                                                <p style={styles.textReveal}id="stat-value">{this.state.score_t.deaths}</p>
                                            </Row>
                                            <Row>
                                                <p style={styles.textReveal}id="stat-header">ADR</p>
                                                <p style={styles.textReveal}id="stat-value">{this.state.score_t.adr}</p>
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