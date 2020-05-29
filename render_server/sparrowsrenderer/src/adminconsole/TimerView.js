import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import './AdminConsole.scss';

const TimerView = observer(class TimerView extends Component {
    constructor(props) {
        super(props)
        this.state = {

            seconds: 0,
            minutes: 0,
            hours: 0

        }
    }

    setTimer = () => {
        console.log("S:" + this.state.seconds)
        console.log("M:" + this.state.minutes)
        console.log("H:" + this.state.hours)
        let totalMillis = this.state.seconds * 1000;
        totalMillis += this.state.minutes * 60 * 1000;
        totalMillis += this.state.hours * 3600 * 1000;
        this.props.store.setCountdown(totalMillis);
        this.props.callback()
    }

    render() {
        return (
            <div id="select_container">

                <div>
                    <a>Timer </a>
                    <Row>
                        <Col>
                            <Label for="timer_hours">Hours</Label>
                            <Input
                                type="number"
                                name="number"
                                min="0"
                                step="1"
                                value={this.state.hours}
                                id="timer_hours"
                                placeholder="Insert hours"
                                onChange={(e) => this.setState({ hours: e.target.value })}
                            />
                        </Col>
                        <Col>
                            <Label for="timer_minutes">Minutes</Label>
                            <Input
                                type="number"
                                name="number"
                                min="0"
                                step="1"
                                max="59"
                                value={this.state.minutes}
                                id="timer_minutes"
                                placeholder="Insert minutes"
                                onChange={(e) => this.setState({ minutes: e.target.value })}
                            />
                        </Col>
                        <Col>
                            <Label for="timer_seconds">Seconds</Label>
                            <Input
                                type="number"
                                name="number"
                                min="0"
                                max="59"
                                step="1"
                                value={this.state.seconds}
                                id="timer_seconds"
                                placeholder="Insert seconds"
                                onChange={(e) => this.setState({ seconds: e.target.value })}
                            />
                        </Col>

                        <Col>
                            <Button color="success" id='timer_btn' onClick={this.setTimer}>Set</Button>
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
});

export default TimerView;