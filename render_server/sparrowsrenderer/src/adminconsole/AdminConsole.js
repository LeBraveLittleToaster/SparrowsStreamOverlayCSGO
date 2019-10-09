import React, { Component } from 'react';
import './AdminConsole.scss'
import MapChangerView from './MapChangerView';
import { observer } from 'mobx-react';
import { Row, Col, Container } from 'reactstrap';
import TimerView from './TimerView';


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

    onSyncNeed = () => {
        console.log("SYNC")
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


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <MapChangerView store={this.props.store} map_number={0} callback={this.onSyncNeed.bind()} />
                        </Col>
                        <Col>
                            <MapChangerView store={this.props.store} map_number={1} callback={this.onSyncNeed.bind()} />
                        </Col>
                        <Col>
                            <MapChangerView store={this.props.store} map_number={2} callback={this.onSyncNeed.bind()} />
                        </Col>
                    </Row>
                    <Row>
                        <TimerView store={this.props.store}/>
                    </Row>
                </Container>
            </div>
        );
    }
});

export default AdminConsole;