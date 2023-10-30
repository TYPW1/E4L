import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import {connect} from "react-redux";

import {Trans} from "react-i18next";
import {Redirect} from "react-router-dom";
import axios from "axios";

export class Info extends React.Component {
    render() {
        let baseUrl = axios.defaults.baseURL;
        return (
            <React.Fragment>
                <Container>
                    <div>
                        <div className="card" style={{marginBottom: "15px"}}>
                            <div className="card-header ">
                                <h4 className="text-center">
                                    <Trans i18nKey="info.information"/>
                                </h4>
                            </div>
                            <div className="card-body">
                                <Row style={{height: "auto"}}>
                                    <Col style={{margin: "auto"}}>
                                        <div>
                                            <Trans i18nKey="info.know_more.header"/>
                                            <ul>
                                                <li>
                                                    <a href={baseUrl + "/file/where_do_you_live.pdf"} target="_blank">
                                                        <Trans i18nKey="info.know_more.where_you_live"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={baseUrl + "/file/food.pdf"} target="_blank">
                                                        <Trans i18nKey="info.know_more.diet"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={baseUrl + "/file/do_you_have_pets.pdf"} target="_blank">
                                                        <Trans i18nKey="info.know_more.pets"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={baseUrl + "/file/how_do_you_get_to_work.pdf"}
                                                       target="_blank">
                                                        <Trans i18nKey="info.know_more.get_to_work"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={baseUrl + "/file/where_do_you_work.pdf"} target="_blank">
                                                        <Trans i18nKey="info.know_more.where_you_work"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={baseUrl + "/file/holiday_travel_during_last_year.pdf"}
                                                       target="_blank">
                                                        <Trans i18nKey="info.know_more.travels"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={baseUrl + "/file/other_energy_consumptions.pdf"}
                                                       target="_blank">
                                                        <Trans i18nKey="info.know_more.things"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <b>
                                                        <a href=" https://m.youtube.com/watch?v=JGsKzHwhIi8"
                                                           target="_blank">
                                                            <Trans i18nKey="info.know_more.renewable"/>
                                                        </a>
                                                    </b>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="text-center mb-0" style={{paddingBottom: "10px"}}>
                                    <Trans i18nKey="info.ext_info"/>
                                </h4>
                                <a href="https://www.withouthotair.com/" target="_blank">
                                    <Trans i18nKey="info.sustainability"/>
                                </a>
                                <Trans i18nKey="info.sustainability_is"/>
                            </div>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
