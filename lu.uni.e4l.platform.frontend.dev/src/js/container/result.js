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
import Table from "react-bootstrap/Table";
import Select from "react-select";
import i18n from "../i18n";
import { fetchResult } from "../action/answerAction";
import { Link } from "react-router-dom";
const Plot = window.createPlotlyComponent.default(Plotly);
import {Pie} from "react-chartjs-2";
import 'chart.piecelabel.js';
import LandCalculator from "./landCalculator";

@connect((store) => {
  return {
    questionnaireReducer: store.questionnaireReducer,
    answerReducer: store.answerReducer,
  };
})

export class Result extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const { sessionId } = this.props.match.params;
    this.props.dispatch(fetchResult(sessionId));
  }

  render() {
    const { calculationResult, error } = this.props.answerReducer;

    if (!calculationResult)
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

   let data = {
               labels : calculationResult.situations.map(e => e),
               datasets : [{
               label:'scores',
               data : calculationResult.scores.map(e => e),
               backgroundColor : calculationResult.colors.map(e => e),
               }]};

    let scores = {};
    scores[i18n.t("result.you")] = calculationResult.result.toFixed(0);
    scores[i18n.t("result.average_scores")] = calculationResult.avgScores;
    scores[i18n.t("result.luxembourg")] = 206;
    scores[i18n.t("result.europe")] = 102;
    scores[i18n.t("result.world")] = 62;

    let plot = {
      x: Object.keys(scores),
      y: Object.values(scores),
    };

 let totalScores = {
      10   : "(blank)",
      30 : calculationResult.clusters[0],
      50 : calculationResult.clusters[1],
      70 : calculationResult.clusters[2],
      90 : calculationResult.clusters[3],
      110 : calculationResult.clusters[4],
      130 : calculationResult.clusters[5],
      150 : calculationResult.clusters[6],
      170 : calculationResult.clusters[7],
      190 : calculationResult.clusters[8],
      210 : calculationResult.clusters[9],
      230 : calculationResult.clusters[10],
      250 : calculationResult.clusters[11],
      270 : calculationResult.clusters[12],
      290 : calculationResult.clusters[13],
      300 : calculationResult.clusters[14],
    };


    let plot2 = {
         y: Object.values(totalScores),
         x: Object.keys(totalScores),
        };

    let s = {
    0 : calculationResult.result,
    20 :  calculationResult.result,
    };

   let plot3 = {
    y: Object.keys(s),
    x: Object.values(s),
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
            <div className="show error message"
            style={{color: 'red', padding: "20px", display: "flex", justifyContent: "center",alignItems: "center", width: "100%" }}>
            {window.localStorage.getItem("currentSeminarStatus")==='CLOSED' && (<Trans i18nKey="seminar.results.user.errorClosed" />)}
            {window.localStorage.getItem("currentSeminarStatus")==='TODO' && (<Trans i18nKey="seminar.results.user.errorTodo" />)}
            {window.localStorage.getItem("currentSeminarStatus")==='CANCELLED' && (<Trans i18nKey="seminar.results.user.errorCancelled" />)}
            </div>
            <div className="card-body">
             <h5 style={{ marginTop: '20px', marginBottom: '50px', textAlign: "center",fontFamily: 'sans-serif',fontWeight: "bold"}}>
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
                        <Trans i18nKey="result.your_result" />
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
                          values={{ result: calculationResult.result.toFixed(0) }}
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
                           values={{ result: calculationResult.avgScores}}
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
                          values={{ result: scores[i18n.t("result.luxembourg")] }}
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
                          values={{ result: scores[i18n.t("result.europe")] }}
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
                          values={{ result: scores[i18n.t("result.world")] }}
                        />
                      </h5>
                    </Textfit>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="card ">
            <div className="card-body" style={{ minHeight: "500px"}}>
            <h5 style={{ textAlign: "center",fontFamily: 'sans-serif',fontWeight: "bold"}}>
             <Trans i18nKey="result.comparison_chart_title" />
             </h5>
              <Row>
                <Plot
                  style={{ width: "3000px", height: "500px"}}
                  data={[
                    {
                      type: "bar",
                      x: plot.x,
                      y: plot.y,
                      hoverinfo: "text",
                      text: plot.y.map(String),
                      textposition: "auto",
                      marker: {
                        color: ["#187cf7", "#1c467a","#1c467a", "#1c467a", "#1c467a"],
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
           <h5 style={{ textAlign: "center",fontFamily: 'sans-serif',fontWeight: "bold"}}>
            <Trans i18nKey="result.pie_chart_title" />
            </h5>

         <Pie data={data}
          height={130} width={350}
                 options={{
                 legend: {
                    display: window.matchMedia("(min-width: 768px)").matches,
                    position: 'left'
                 },
                 title: {
                             display: true,
                             text: calculationResult.note,
                             fontColor: 'red',
                              fontSize: 15
                         },
                   pieceLabel: {
                    render: 'value',
                    position: 'top',
                    fontColor: 'white'
                 }
                 }}
           />
          </div>
          <div className="card ">
                      <div className="card-body" style={{ minHeight: "500px"}}>
                      <h5 style={{ marginTop: '20px',textAlign: "center",fontFamily: 'sans-serif',fontWeight: "bold"}}>
                        <Trans i18nKey="result.distribution_chart_title" />
                       </h5>
                       <Row>
                          <Plot
                            style={{ width: "3000px", height: "500px" }}
                            data={[
                              {
                                type: "bar",
                                x: plot2.x,
                                y: plot2.y,
                                name: i18n.t("result.e4l_users"),
                                hoverinfo: "text",
                                text: plot2.y.map(String),
                                textposition: "auto",
                                marker: {
                                  color: ["#1c467a", "#1c467a","#1c467a", "#1c467a", "#1c467a","#1c467a","#1c467a","#1c467a","#1c467a","#1c467a","#1c467a",
                                "#1c467a","#1c467a","#1c467a","#1c467a","#1c467a"],
                                  opacity: 1,
                                      line: {
                                        width: 1
                                      }
                                },
                              },
                             {
                                  type: "scatter",
                                  x: plot3.x,
                                  y: plot3.y,
                                  name: i18n.t("result.you"),
                                  marker: {
                                  color: 'red',
                                  opacity: 2,
                                  line: {
                                  width: 3,
                                  color: 'red'
                                   }
                                   },
                                   },
                            ]}
                             layout={{
                            annotations: [
                                     {
                                        x: calculationResult.result,
                                        y: 21,
                                        text: '<b> ' + i18n.t("result.you") + ' </b>',
                                        font: {
                                          color: "red",
                                           size: 14,
                                         },
                                        xref: 'x',
                                        yref: 'y',
                                        showarrow: false,
                                         },
                                        /*{
                                        x: 210,
                                        y: -1,
                                        text: '200+',
                                        textposition: 'bottom',
                                        xref: 'x',
                                        yref: 'y',
                                        showarrow: false,
                                          }*/
                                      ],
                                  xaxis: {
                                      title: {
                                        text: i18n.t("result.e4l_users"),
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
                                        text: i18n.t("result.number_people"),
                                        font: {
                                          family: 'sans-serif',
                                          size: 18,
                                          color: 'black'
                                        }
                                      },
                                          dtick: 10,
                                          gridwidth: 1
                                    }
                            }}
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
                <div className="card-body" style={{minHeight: "500px"}}>
                    <h5 style={{marginTop: '20px', textAlign: "center", fontFamily: 'sans-serif', fontWeight: "bold"}}>
                        <Trans i18nKey="result.land_calc.header" />
                    </h5>
                    <p>
                        <Trans i18nKey="result.land_calc.intro" />
                    </p>
                    <Row>
                        <LandCalculator userResult={calculationResult.result}/>
                    </Row>
                </div>
            </div>

        </div>
        <VerticalSpace vheight={2} />
      </React.Fragment>
    );
  }
}
