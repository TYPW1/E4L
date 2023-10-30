import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";

import { Trans } from "react-i18next";
import {Link, Redirect} from "react-router-dom";

export class Mission extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <div>
            <div className="card">
              <div className="card-header ">
                <h4 className="text-center mb-0">
                  <Trans i18nKey="mission.our_mission" />
                </h4>
              </div>
              <div className="card-body">
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <div>
                      <ul>
                        <li>
                          <Trans i18nKey="mission.mission_1" />
                        </li>
                        <li>
                          <Trans i18nKey="mission.mission_2">
                            text <Link to="/sponsors">link</Link>
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="mission.mission_3" />
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <div>
                      <h6><Trans i18nKey="mission.for_educators" /></h6>
                      <ul>
                        <li>
                          <Trans i18nKey="mission.mission_4" />
                        </li>
                        <li>
                          <Trans i18nKey="mission.mission_5" />
                        </li>
                        <li>
                          <Trans i18nKey="mission.mission_6" />
                        </li>
                        <li>
                          <Trans i18nKey="mission.mission_7">
                            <Link to="/seminarHome" />
                            <Link to="/contactus" />
                          </Trans>
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
