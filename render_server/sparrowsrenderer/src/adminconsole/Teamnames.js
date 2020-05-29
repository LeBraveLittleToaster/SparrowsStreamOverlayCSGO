import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input, Row, Col, FormGroup, Button, Label } from 'reactstrap';
import "./AdminConsole.scss";

const Teamnames = observer(class Teamnames extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name_ct: this.props.name_ct,
            name_t: this.props.name_t
        }
    }

    onNameChange(){
        this.props.store.setTeamnames(this.state.name_ct, this.state.name_t)
        this.props.callback();
    }

    render() {
        return (
            <div id="select_container">
                <div>
                    <a>Teamnnames</a>
                    <Button 
                        color="success"
                        onClick={(e) => this.onNameChange()}
                        >Update names</Button>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="ctName">Left Team Name</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    id="ctName"
                                    placeholder="Left Team"
                                    value={this.state.name_ct}
                                    onChange={(e) => this.setState({name_ct : e.target.value})}
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
                                    value={this.state.name_t}
                                    onChange={(e) => this.setState({name_t : e.target.value})}
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