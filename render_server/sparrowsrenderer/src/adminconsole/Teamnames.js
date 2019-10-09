import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input, Row, Col, FormGroup, Label } from 'reactstrap';
import "./AdminConsole.scss";

const Teamnames = observer(class Teamnames extends Component {
    constructor(props) {
        super(props)
    }

    onTTeamChanged(e) {
        this.props.store.adjustTeamnames(undefined, e.target.value);
        this.props.callback();
    }

    onCtTeamChanged(e) {
        this.props.store.adjustTeamnames(e.target.value, undefined);
        this.props.callback();
    }

    render() {
        return (
            <div id="select_container">
                <div>
                    <a>Teamnnames</a>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="ctName">Left Team Name</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    id="ctName"
                                    placeholder="Left Team"
                                    value={this.props.store.retrieveTeamnames.ct}
                                    onChange={(e) => this.onCtTeamChanged(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="tName">Right Team Name</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    id="tName"
                                    placeholder="Right Team"
                                    value={this.props.store.retrieveTeamnames.t}
                                    onChange={(e) => this.onTTeamChanged(e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
});

export default Teamnames;