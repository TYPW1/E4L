import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import React from "react";
import { fetchSessionCount } from "../action/questionnaireAction";
import { connect } from "react-redux";
import { VerticalSpace } from "../presentation/verticalSpace";
import exampleImage from "../../public/img/self.png";
import { Textfit } from "react-textfit";
import { Trans } from "react-i18next";
import { hideNavButton, showNavButton } from "../action/navAction";
@connect((store) => {
  return {
    questionnaireReducer: store.questionnaireReducer,
  };
})
export class Home extends React.Component {
  componentWillMount() {
    this.props.dispatch(showNavButton());
    this.props.dispatch(fetchSessionCount());
  }
  render() {
    return (
      <div className="container containerE4l">
        <div className="card">
          <div className="card-header ">
            <h4 className="text-center mb-0">
              <Trans i18nKey="home.welcome" />
            </h4>
          </div>
          <div className="card-body">
            <Trans i18nKey="home.intro">
              Intro <Link to="/seminarHome">seminar link</Link>
            </Trans>

            <Row style={{ height: "10vh" }}>
              <Col style={{ margin: "auto", textAlign: "center" }}>
                <Link to="/calculator">
                  <Button onClick={this.onClickCalculateButton}>
                    <Trans i18nKey="home.calculate" />
                  </Button>
                </Link>
              </Col>
              <Col style={{ margin: "auto" }}>
                <div>
                  <Trans
                    i18nKey="home.scores_calculated"
                    values={{
                      scores: this.props.questionnaireReducer.sessionCount,
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <VerticalSpace vheight={1} />
        <div className="card ">
          <div className="card-body">
            <Row>
              <Col style={{ margin: "auto" }}>
                <h5>
                  <Trans i18nKey="home.why.title" />
                </h5>
                <ul>
                  <li>
                    <Trans i18nKey="home.why.limited" />
                  </li>
                  <li>
                    <Trans i18nKey="home.why.heating" />
                  </li>
                  <li>
                    <Trans i18nKey="home.why.health" />
                  </li>
                  <li>
                    <Trans i18nKey="home.why.expensive" />
                  </li>
                </ul>
                <h6>
                  <Trans i18nKey="home.why.habits" />
                </h6>
              </Col>
            </Row>
            <Row>
              <Col style={{ margin: "auto", textAlign: "center" }}>
                {" "}
                <div className="card ">
                  <div className="card-body">
                    <Row>
                      <Col
                        style={{
                          margin: "auto",
                          height: "100%",
                          textAlign: "center",
                        }}
                      >
                        <iframe
                          style={{maxWidth: "560px", width: "100%"}}
                          height="315"
                          src="https://www.youtube.com/embed/p3HW8M-09os"
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <VerticalSpace vheight={1} />

        <VerticalSpace vheight={1} />
        <div className="card ">
          <div className="card-body">
            <Row>
              <Col style={{ margin: "auto" }}>
                <h5>
                  <Trans i18nKey="home.how_it_works.title" />
                </h5>
                <ul>
                  <li>
                    <Trans i18nKey="home.how_it_works.avg_energy_use" />
                  </li>
                  <li>
                    <Trans i18nKey="home.how_it_works.gave_every_activity_score" />
                  </li>
                  <li>
                    <Trans i18nKey="home.how_it_works.choose_picture" />
                  </li>
                  <li>
                    <Trans i18nKey="home.how_it_works.add_pictures_up" />
                  </li>
                  <li>
                    <Trans i18nKey="home.how_it_works.compare" />
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col style={{ margin: "auto", textAlign: "center" }}>
                {" "}
                <div className="card ">
                  <div className="card-body">
                    <Row>
                      <Col
                        style={{
                          margin: "auto",
                          height: "100%",
                          textAlign: "center",
                        }}
                      >
                        <iframe
                          style={{maxWidth: "560px", width: "100%"}}
                          height="315"
                          src="https://www.youtube.com/embed/IiiJfyWC74s"
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <VerticalSpace vheight={1} />
      </div>
    );
  }
  onClickCalculateButton = () => {
    this.props.dispatch(hideNavButton());
  };
}
