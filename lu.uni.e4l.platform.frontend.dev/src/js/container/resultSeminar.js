import React from "react";

import lux_logo from "../../public/img/lux.svg";
import e4l_users_logo from "../../public/img/group_users_e4l.svg";
import europe_logo from "../../public/img/europe.svg";
import world_logo from "../../public/img/world.svg";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import exampleImage from "../../public/img/user.svg";
import { VerticalSpace } from "../presentation/verticalSpace";
import { MDBBtn, MDBIcon } from "mdbreact";
import { Textfit } from "react-textfit";
import { Trans } from "react-i18next";
import { Redirect } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Select from "react-select";
import i18n from "../i18n";
import { fetchResult } from "../action/answerAction";
import { seminarComputeEnergy } from "../action/seminarAction";
import { Link } from "react-router-dom";
const Plot = window.createPlotlyComponent.default(Plotly);
import { hideNavButton, showLogoutButton, showNavButton } from "../action/navAction";
import { Pie } from "react-chartjs-2";
import 'chart.piecelabel.js';
import LandCalculator from "./landCalculator";

@connect((store) => {
    return {
        seminarReducer: store.seminarReducer,
        userReducer: store.userReducer,
        navReducer: store.navReducer
    };
})
export class ResultSeminar extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { accessCode } = this.props.match.params;
        this.props.dispatch(seminarComputeEnergy(accessCode));
    }
    render() {

        if (!this.props.userReducer.isAuthenticate) {
            this.props.dispatch(showNavButton())
            return <Redirect to={{ pathname: "/login" }} />;
        }

        if (this.props.userReducer.isInfoPending) {
            return (<React.Fragment><Container>
                <Loader style={{ display: 'flex', justifyContent: "center" }}
                    type="TailSpin"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </Container>
            </React.Fragment>)
        }

        if (!this.props.userReducer.user.roles.includes('ADMIN')) {

            return (
                <React.Fragment>
                    <Container>
                        <Alert key="admin_alert" variant="danger">
                            <Trans i18nKey="admin.not_admin" />
                        </Alert>
                        <Link to="/">
                            <button type="button" className="btn btn-primary mr-3">
                                <Trans i18nKey="home.home" />
                            </button></Link>
                    </Container>

                </React.Fragment>

            )
        }

        const { seminarResult, error } = this.props.seminarReducer;

        if (!seminarResult)
            return (
                <div className="container containerE4l">
                    {error && (
                        <div className="alert alert-danger">
                            <h5 className="alert-heading">{error.message}</h5>
                            {error.response && error.response.data.message}
                        </div>
                    )}
                </div>
            );

        let scores = {
            "Seminar participants": seminarResult.averageScoreSeminar.toFixed(0),
            "E4L Users Average Scores": seminarResult.averageScore,
            "Luxembourg": 206,
            "Europe": 102,
            "World": 62,
        };

        let plot = {
            x: Object.keys(scores),
            y: Object.values(scores),
        };

        let totalScores = {
            10: "(blank)",
            30: seminarResult.clusters[0],
            50: seminarResult.clusters[1],
            70: seminarResult.clusters[2],
            90: seminarResult.clusters[3],
            110: seminarResult.clusters[4],
            130: seminarResult.clusters[5],
            150: seminarResult.clusters[6],
            170: seminarResult.clusters[7],
            190: seminarResult.clusters[8],
            210: seminarResult.clusters[9],
            230: seminarResult.clusters[10],
            250: seminarResult.clusters[11],
            270: seminarResult.clusters[12],
            290: seminarResult.clusters[13],
            300: seminarResult.clusters[14],
        };

        let xList = [30,50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 300]

        let totalScoresSeminar = {
            10: "(blank)",
            30: seminarResult.clustersSeminarList[0],
            50: seminarResult.clustersSeminarList[1],
            70: seminarResult.clustersSeminarList[2],
            90: seminarResult.clustersSeminarList[3],
            110: seminarResult.clustersSeminarList[4],
            130: seminarResult.clustersSeminarList[5],
            150: seminarResult.clustersSeminarList[6],
            170: seminarResult.clustersSeminarList[7],
            190: seminarResult.clustersSeminarList[8],
            210: seminarResult.clustersSeminarList[9],
            230: seminarResult.clustersSeminarList[10],
            250: seminarResult.clustersSeminarList[11],
            270: seminarResult.clustersSeminarList[12],
            290: seminarResult.clustersSeminarList[13],
            300: seminarResult.clustersSeminarList[14],
        };

        let plot2 = {
            y: Object.values(totalScores),
            x: Object.keys(totalScoresSeminar),
        };


        let plot3 = {
            y: Object.values(totalScoresSeminar),
            x: Object.keys(totalScoresSeminar),
        };

        return (
            <React.Fragment>
                <div className="container containerE4l">
                    <div className="card ">
                        <div className="card-header text-center">
                            <h3>
                                <Trans i18nKey="result.visual_comparision" />
                            </h3>

                        </div>
                        <div className="card-body">
                            <h5 style={{ marginTop: '20px', marginBottom: '50px', textAlign: "center", fontFamily: 'sans-serif', fontWeight: "bold" }}>
                                <Trans i18nKey="result.logo_title" />
                            </h5>
                            <Row>
                                <Col>
                                    <div>
                                        <img src={exampleImage} className="logo-scores" />
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h6>
                                                Seminar Participants
                            </h6>
                                        </Textfit>

                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h5>
                                                <Trans
                                                    i18nKey="result.kwh_day"
                                                    values={{ result: seminarResult.averageScoreSeminar.toFixed(0) }}
                                                />
                                            </h5>
                                        </Textfit>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <img src={e4l_users_logo} className="logo-scores" />
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h6>
                                                <Trans i18nKey="result.average_scores" />
                                            </h6>
                                        </Textfit>
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h5>
                                                <Trans
                                                    i18nKey="result.kwh_day"
                                                    values={{ result: seminarResult.averageScore }}
                                                />
                                            </h5>
                                        </Textfit>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <img src={lux_logo} className="logo-scores" />
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h6>
                                                <Trans i18nKey="result.luxembourg_avg" />
                                            </h6>
                                        </Textfit>
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h5>
                                                <Trans
                                                    i18nKey="result.kwh_day"
                                                    values={{ result: scores["Luxembourg"] }}
                                                />
                                            </h5>
                                        </Textfit>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <img src={europe_logo} className="logo-scores" />
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h6>
                                                <Trans i18nKey="result.europe_avg" />
                                            </h6>
                                        </Textfit>
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h5>
                                                <Trans
                                                    i18nKey="result.kwh_day"
                                                    values={{ result: scores["Europe"] }}
                                                />
                                            </h5>
                                        </Textfit>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <img src={world_logo} className="logo-scores" />
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h6>
                                                <Trans i18nKey="result.world_avg" />
                                            </h6>
                                        </Textfit>
                                        <Textfit
                                            mode="single"
                                            style={{ margin: "auto", textAlign: "center" }}
                                            forceSingleModeWidth={false}
                                        >
                                            <h5>
                                                <Trans
                                                    i18nKey="result.kwh_day"
                                                    values={{ result: scores["World"] }}
                                                />
                                            </h5>
                                        </Textfit>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="card ">
                        <div className="card-body">
                            <h5 style={{ textAlign: "center", fontFamily: 'sans-serif', fontWeight: "bold" }}>
                                <Trans i18nKey="result.comparison_chart_title" />
                            </h5>
                            <Row>
                                <Plot
                                    style={{ width: "3000px", height: "500px" }}
                                    data={[
                                        {
                                            type: "bar",
                                            x: plot.x,
                                            y: plot.y,
                                            hoverinfo: "text",
                                            text: plot.y.map(String),
                                            textposition: "auto",
                                            marker: {
                                                color: ["#187cf7", "#1c467a", "#1c467a", "#1c467a", "#1c467a"],
                                            },
                                        },
                                    ]}
                                    config={{
                                        responsive: true,
                                        displayModeBar: false,
                                        staticPlot: true,
                                    }}
                                />
                            </Row>
                        </div>
                    </div>
                    <div className="card ">
                        <div className="card-body">
                            <h5 style={{ marginTop: '20px', textAlign: "center", fontFamily: 'sans-serif', fontWeight: "bold" }}>
                                <Trans i18nKey="result.distribution_chart_title" />
                            </h5>
                            <Row>
                                <Plot
                                    style={{ width: "3000px", height: "500px" }}
                                    data={[
                                        {
                                            type: "bar",
                                            x: xList,
                                            y: seminarResult.clusters,
                                            name: 'E4L Users',
                                            hoverinfo: "text",
                                            marker: {
                                                color: ["#1c467a", "#1c467a", "#1c467a", "#1c467a", "#1c467a", "#1c467a", "#1c467a", "#1c467a", "#1c467a", "#1c467a", "#1c467a",
                                                    "#1c467a", "#1c467a", "#1c467a", "#1c467a", "#1c467a"],
                                            },
                                        },
                                        {
                                            type: "bar",
                                            x: xList,
                                            y: [0],
                                            showlegend: false,
                                            hoverinfo: null,
                                        },
                                        {
                                            type: "bar",
                                            x: xList,
                                            y: [0],
                                            showlegend: false,
                                            hoverinfo: null,
                                            yaxis: 'y2',
                                        },
                                        {
                                            type: "bar",
                                            x: xList,
                                            y: seminarResult.clustersSeminarList,
                                            text: plot3.y.map(String),
                                            name: 'Workshop Participants',
                                            yaxis: 'y2',
                                            marker: {
                                                color: 'red',
                                            },
                                        },

                                    ]}
                                    layout={{
                                        legend: {x: 0, y: 1.2},
                                        barmode: 'group',
                                        bargap: 0.15,
                                        bargroupgap: 0.1,
                                        xaxis: {
                                            title: {
                                                text: 'Daily Energy Consumption (kWh/d/p)',
                                                font: {
                                                    family: 'sans-serif',
                                                    size: 18,
                                                    color: 'black',
                                                }
                                            },
                                            dtick: 20
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Number of E4L users',
                                                font: {
                                                    color: '#1c467a'
                                                }
                                            },
                                            color: '#1c467a',
                                        },
                                        yaxis2: {
                                            title: {
                                                text: 'Number of workshop participants',
                                                font: {
                                                    color: 'red'
                                                }
                                            },
                                            color: 'red',
                                            overlaying: 'y',
                                            side: 'right'
                                        }
                                    }}
                                    config={{
                                        responsive: true,
                                        displayModeBar: true,
                                        staticPlot: true,
                                    }}
                                />
                            </Row>
                        </div>
                    </div>
                    <div className="card ">
                        <div className="card-body" style={{minHeight: "500px"}}>
                            <h5 style={{marginTop: '20px', textAlign: "center", fontFamily: 'sans-serif', fontWeight: "bold"}}>
                                <Trans i18nKey="result.land_calc.header" />
                            </h5>
                            <p>
                                <Trans i18nKey="result.land_calc.intro" />
                            </p>
                            <Row>
                                <LandCalculator userResult={seminarResult.averageScoreSeminar}/>
                            </Row>
                        </div>
                    </div>

                </div>
                <VerticalSpace vheight={2} />
            </React.Fragment>
        );
    }













}
