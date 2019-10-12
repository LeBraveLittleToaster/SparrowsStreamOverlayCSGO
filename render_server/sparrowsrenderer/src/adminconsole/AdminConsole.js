import React, { Component } from 'react';
import './AdminConsole.scss'
import MapChangerView from './MapChangerView';
import { observer } from 'mobx-react';
import { Row, Col, Container } from 'reactstrap';
import TimerView from './TimerView';
import Teamnames from './Teamnames';


const AdminConsole = observer(class AdminConsole extends Component {

    ws = new WebSocket('ws://localhost:8080/ws')

    constructor(props) {
        super(props)
        this.state = {
            text: "HelloWorld"
        }
        this.store = props.store;
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log("Connected")
        }

        this.ws.onmessage = evt => {
            const message = evt.data
            let msg = JSON.parse(message)
            console.log(msg)
            if (msg.type === "init") {
                this.props.store.injectInitData(msg.data);
            }

            this.setState({
                text: message
            })
        }

        this.ws.onclose = () => {
            console.log("Disconnected")
        }
    }

    onMapSyncNeed = () => {
        console.log("Sync map")
        let store_state = {
            type: "maps_update",
            maps: [
                this.props.store.retrieveFirstMap,
                this.props.store.retrieveSecondMap,
                this.props.store.retrieveThirdMap
            ]
        }
        console.log("SENDING: " + JSON.stringify(store_state))
        this.ws.send(JSON.stringify(store_state))
    }

    onTimerSyncNeed = () => {
        console.log("Sync Timer")
        let store_state = {
            type: "timer_update",
            timer_millis: this.props.store.retrieveCountdown.initValue
        }
        console.log("SENDING: " + JSON.stringify(store_state))
        this.ws.send(JSON.stringify(store_state))
    }

    onTeamnamesSyncNeed = () => {
        console.log("Sync Teamnames")
        let store_state = {
            type: "teamnames_update",
            teamnames: this.props.store.retrieveTeamnames
        }
        console.log("SENDING: " + JSON.stringify(store_state))
        this.ws.send(JSON.stringify(store_state))
    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <MapChangerView store={this.props.store} map_number={0} map={this.props.store.retrieveFirstMap} callback={this.onMapSyncNeed.bind()} />
                        </Col>
                        <Col>
                            <MapChangerView store={this.props.store} map_number={1} map={this.props.store.retrieveSecondMap} callback={this.onMapSyncNeed.bind()} />
                        </Col>
                        <Col>
                            <MapChangerView store={this.props.store} map_number={2} map={this.props.store.retrieveThirdMap} callback={this.onMapSyncNeed.bind()} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TimerView store={this.props.store} callback={this.onTimerSyncNeed.bind()}/>    
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Teamnames store={this.props.store} callback={this.onTeamnamesSyncNeed.bind()}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
});

export default AdminConsole;