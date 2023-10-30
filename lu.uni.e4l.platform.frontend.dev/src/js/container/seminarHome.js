import React from "react";
import Container from "react-bootstrap/Container";
import {Button, Modal, Form, Col, Row, Carousel} from 'react-bootstrap';
import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";
import { hideNavButton, showNavButton } from "../action/navAction";
import { setSeminarInSession } from "../action/answerAction";
import { seminarsGetRequest } from "../action/seminarAction";
import { Trans } from "react-i18next";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import i18n from "../i18n";
import ws1 from '../../public/img/workshop/ws1.jpeg'
import ws2 from '../../public/img/workshop/ws2.jpeg'
import ws3 from '../../public/img/workshop/ws3.jpeg'
import ws4 from '../../public/img/workshop/ws4.jpeg'

@connect((store) => {
    return {
        questionnaireReducer: store.questionnaireReducer,
        answerReducer: store.answerReducer,
        seminarReducer: store.seminarReducer,
    };
})
export class SeminarHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seminar_access_code: '',
            i_have_code: false,
            redirect: false,
            error: '',
            isSmallScreen: !window.matchMedia("(min-width: 768px)").matches
        }
    }

    componentDidMount = () => {
        this.props.dispatch(showNavButton());
    }

    onClickCalculateButton = (event) => {
        event.preventDefault();
        this.props.dispatch(seminarsGetRequest()).then( () => {
        let simple_seminars = this.props.seminarReducer.simpleSeminars
        let is_seminar_open = false
        let is_correct_access_code = true ? Object.keys(simple_seminars).filter(s => s === this.state.seminar_access_code).length > 0 : false
        if (!is_correct_access_code) {
            this.setState({ error: "Incorrect access code" })
        } else if (is_correct_access_code && simple_seminars[this.state.seminar_access_code] === 'OPEN') {
            is_seminar_open = true
        } else {
            this.setState({ error: "The seminar with access code " + this.state.seminar_access_code + " is not open" })
        }
        if (is_seminar_open) {
            this.props.dispatch(setSeminarInSession(this.state.seminar_access_code))
            this.setState({ error: '', redirect:true })
        }
    })
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({
            seminar_access_code: value
        });
    };

    toInputUppercase = (e) => {
        e.target.value = ("" + e.target.value).toUpperCase();
      };

    onIHaveCode = (e) => {
        this.setState({
            i_have_code: true
        });
    }

    render() {

        let error = this.state.error
        if (this.state.redirect) {
            return <Redirect to={{pathname: "/calculator"}}/>;
        }

        return (
            <React.Fragment>
                <Container>
                    <div>
                        <div className="card">
                            <div className="card-header ">
                                <h4 className="text-center mb-0">
                                    <Trans i18nKey="seminar.home" />
                                </h4>
                            </div>
                            <center>
                                <div style={{width: this.state.isSmallScreen ? "100%" : "65%", marginTop: "24px"}}>
                                    <Carousel>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={ws1}
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={ws2}
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={ws3}
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={ws4}
                                            />
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                            </center>
                            <div className="card-body">
                                <Trans i18nKey="seminar.intro">
                                    Intro <Link to="/contactus">contact us</Link>.
                                </Trans>
                            </div>
                            {!this.state.i_have_code &&
                            <div style={{width: "100%", textAlign: "center", color: "#007bff", cursor: "pointer"}}
                                 onClick={this.onIHaveCode}>
                                <b>
                                    <Trans i18nKey="seminar.button"></Trans>
                                </b>
                            </div>
                            }
                            {this.state.i_have_code &&
                            <Form onSubmit={this.onClickCalculateButton}>
                                <Form.Group as={Row} className="justify-content-center" controlId="formPlaintextEmail">

                                    <Form.Control style={{width: "250px", margin: "10px"}} name={"seminar_access_code"}
                                                  autoFocus
                                                  onInput={this.toInputUppercase} onChange={this.handleInputChange}
                                                  type="text" placeholder={i18n.t("seminar.field")}
                                                  value={this.state.seminar_access_code}/>

                                    <Button style={{margin: "10px"}} onClick={this.onClickCalculateButton}>
                                        <Trans i18nKey="seminar.access"/>
                                    </Button>

                                </Form.Group>
                                <Row style={{
                                    color: 'red',
                                    padding: "0px",
                                    display: "flex",
                                    fontSize: "small",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%"
                                }}>
                                    {error}</Row>
                            </Form>
                            }
                            <div className="card-body">
                                <Row style={{ height: "auto" }}>
                                    <Col style={{ margin: "auto" }}>
                                        <div>
                                            <h6><Trans i18nKey="seminar.objectives.title" /></h6>
                                            <ul>
                                                <li>
                                                    <Trans i18nKey="seminar.objectives.objective_1" />
                                                </li>
                                                <li>
                                                    <Trans i18nKey="seminar.objectives.objective_2" />
                                                </li>
                                                <li>
                                                    <Trans i18nKey="seminar.objectives.objective_3" />
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ height: "auto" }}>
                                    <Col style={{ margin: "auto" }}>
                                        <div>
                                            <h6><Trans i18nKey="seminar.learning_outcomes.title" /></h6>
                                            <ul>
                                                <li>
                                                    <Trans i18nKey="seminar.learning_outcomes.learning_outcome_1" />
                                                </li>
                                                <li>
                                                    <Trans i18nKey="seminar.learning_outcomes.learning_outcome_2" />
                                                </li>
                                                <li>
                                                    <Trans i18nKey="seminar.learning_outcomes.learning_outcome_3" />
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ height: "auto" }}>
                                    <Col style={{ margin: "auto" }}>
                                        <div>
                                            <h6><Trans i18nKey="seminar.format.title" /></h6>
                                            <ul>
                                                <li>
                                                    <Trans i18nKey="seminar.format.format_1" />
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ height: "auto" }}>
                                    <Col style={{ margin: "auto" }}>
                                        <div>
                                            <h6><Trans i18nKey="seminar.target_audience.title" /></h6>
                                            <ul>
                                                <li>
                                                    <Trans i18nKey="seminar.target_audience.target_audience_1" />
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
