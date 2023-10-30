import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import {Trans} from "react-i18next";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {Alert, Card, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {sendMessage} from "../action/contactAction";

@connect((store) => {
    return {
        contactReducer: store.contactReducer,
    }
})
export class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            subject: "",
            message: "",
            consensus: false,
            formValidated: false,
            submitted: false
        };
    }

    componentDidMount() {
        this.setState({...this.state, submitted: false, formValidated: false})
    }

    handleConsensusChange = (event) => {
        this.setState({...this.state, consensus: !this.state.consensus})
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleSend = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({...this.state, formValidated: true});
            return
        }

        this.props.dispatch(sendMessage({
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        }));
        this.setState({...this.state, submitted: true});
    };

    render() {
        return (
            <React.Fragment>
                <Container>
                    { this.state.submitted && this.props.contactReducer.sendFulfilled &&
                    <Alert variant="success">
                        <Trans i18nKey="contact.send_success"/>
                    </Alert>}
                    { this.state.submitted && this.props.contactReducer.error &&
                    <Alert variant="danger">
                        <Trans i18nKey="contact.send_fail"/> <br/> {this.props.contactReducer.error.message}
                    </Alert>}
                    <Card>
                        <Card.Header style={{textAlign: "center"}}>
                            <h4>
                                <Trans i18nKey="contact.contact_form"/>
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={this.state.formValidated} onSubmit={this.handleSend}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label><Trans i18nKey="contact.first_name"/> *</Form.Label>
                                        <Form.Control required type="text" value={this.state.first_name}
                                                      name={"first_name"} onChange={this.handleInputChange}/>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label><Trans i18nKey="contact.last_name"/> *</Form.Label>
                                        <Form.Control required type="text" value={this.state.last_name}
                                                      name={"last_name"} onChange={this.handleInputChange}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group>
                                    <Form.Label><Trans i18nKey="contact.email"/> *</Form.Label>
                                    <Form.Control required type="email" value={this.state.email}
                                                  name={"email"} onChange={this.handleInputChange}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label><Trans i18nKey="contact.subject"/> *</Form.Label>
                                    <Form.Control required type="text" value={this.state.subject}
                                                  name={"subject"} onChange={this.handleInputChange}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label><Trans i18nKey="contact.message"/> *</Form.Label>
                                    <Form.Control required as="textarea" rows={5} value={this.state.message}
                                                  name={"message"} onChange={this.handleInputChange}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Check type="checkbox"
                                                required
                                                label={<span><Trans i18nKey="contact.consensus"/><Link to="/privacyNotice"><Trans i18nKey="contact.privacy_policy"/></Link> *</span>}
                                                name={"consensus"} value={this.state.consensus}
                                                onChange={this.handleConsensusChange}/>
                                </Form.Group>

                                <Form.Group>
                                    <Trans i18nKey="contact.mandatory_field"/>
                                </Form.Group>

                                <Button type="submit" variant="primary" size="lg" block
                                        disabled={this.props.contactReducer.sending}>
                                    {this.props.contactReducer.sending ? <Trans i18nKey="contact.sending"/> : <Trans i18nKey="contact.send"/>}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        );
    }
}
