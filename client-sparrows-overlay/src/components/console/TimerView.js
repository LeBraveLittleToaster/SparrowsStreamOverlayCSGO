import React, { Component } from 'react';

class TimerView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0
        }
    }

    setTimer = () => {
        let totalMillis = this.state.seconds * 1000;
        totalMillis += this.state.minutes * 60 * 1000;
        totalMillis += this.state.hours * 3600 * 1000;
    }

    render() {
        return (<div>
            <div>
                <label htmlFor="number">Hours:</label>
                <input type="number" name="number" min="0" max="48"
                    value={this.state.hours}
                    onChange={(e) => this.setState({ hours: e.target.value })} />
            </div>

            <div>
                <label htmlFor="number">Minutes:</label>
                <input type="number" name="number" min="0" max="59"
                    value={this.state.minutes}
                    onChange={(e) => this.setState({ minutes: e.target.value })} />
            </div>

            <div>
                <label htmlFor="number">Seconds:</label>
                <input type="number" name="number" min="0" max="59"
                    value={this.state.seconds}
                    onChange={(e) => this.setState({ seconds: e.target.value })} />
            </div>

        </div>);
    }
};

export default TimerView;