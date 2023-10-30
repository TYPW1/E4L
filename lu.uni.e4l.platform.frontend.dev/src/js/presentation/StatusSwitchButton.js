import React from "react";
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { seminarStatusPutRequest, seminarListGetRequest, seminarComputeEnergy } from "../action/seminarAction";
import { connect } from "react-redux";

@connect((store) => {
    return {
        seminarReducer: store.seminarReducer,
    }
})
export class StatusSwitchButton extends React.Component {


    handleSubmitUpdateStatus = (status, seminar) => {
        let can_update = false
        if (seminar.status === 'TODO' && (status === 'OPEN' || status === 'CANCELLED')) {
            can_update = true
            seminar.status = status
        } else if (seminar.status === 'OPEN' && (status === 'TODO' || status === 'CLOSED')) {
            can_update = true
            seminar.status = status
        }
        if (can_update) {
            this.props.dispatch(seminarStatusPutRequest(seminar)).then(() => {
                if (!this.props.seminarReducer.isStatusPutPending && this.props.seminarReducer.isStatusPut) {
                    // if (status === 'CLOSED') {
                    //     this.props.dispatch(seminarComputeEnergy(seminar.accessCode)).then(this.props.dispatch(seminarListGetRequest()).then(this.props.resetAndAddToStateSelected(seminar.id)))
                    // }
                    this.props.dispatch(seminarListGetRequest()).then(this.props.resetAndAddToStateSelected(seminar.id))
                } else {
                    error = this.props.seminarReducer.error.response.data.message;
                }
            });
        }
    };

    render() {
        let selected_seminar = this.props.selected_seminar;
        let status = selected_seminar.status;
        return (
            <div>
                {status === 'TODO' &&
                    <Col><Button style={{ "padding": "4px", "margin": "4px" }} onClick={() => this.handleSubmitUpdateStatus('CANCELLED' ,selected_seminar)} >Cancel</Button><Button style={{ "padding": "4px", "margin": "4px" }}  onClick={() => this.handleSubmitUpdateStatus('OPEN' ,selected_seminar)}>Open</Button></Col>
                }
                {status === 'OPEN' &&
                    <Col><Button style={{ "padding": "4px", "margin": "4px" }}  onClick={() => this.handleSubmitUpdateStatus('TODO' ,selected_seminar)}>Todo</Button><Button style={{ "padding": "4px", "margin": "4px" }}  onClick={() => this.handleSubmitUpdateStatus('CLOSED' ,selected_seminar)}>Close</Button></Col>
                }
            </div>
        )
    }
}

