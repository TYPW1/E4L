import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";
import { VerticalSpace } from "../presentation/verticalSpace";

import { Trans } from "react-i18next";
import { Redirect } from "react-router-dom";
import { Link } from "react-router";

export class PrivacyNotice extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <div>
            <div className="card">
              <div className="card-header ">
                <h4 className="text-center mb-0">
                  <Trans i18nKey="privacy.privacy_notice" />
                </h4>
              </div>
              <div className="card-body">
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <div>
                      <h5>
                        <Trans i18nKey="privacy.table_of_contents.title" />
                      </h5>
                      <a href="#content_intro">
                        <Trans i18nKey="privacy.table_of_contents.introduction" />
                      </a>
                      <ol>
                        <li>
                          <a href="#content_1">
                            <Trans i18nKey="privacy.table_of_contents.who_are_we" />
                          </a>
                        </li>
                        <li>
                          <a href="#content_2">
                            <Trans i18nKey="privacy.table_of_contents.purpose" />
                          </a>
                        </li>
                        <li>
                          <a href="#content_3">
                            <Trans i18nKey="privacy.table_of_contents.data_collection" />
                          </a>
                        </li>
                        <li>
                          <a href="#content_4">
                            <Trans i18nKey="privacy.table_of_contents.rights" />
                          </a>
                        </li>
                      </ol>
                      <p></p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <VerticalSpace vheight={1} />
            <VerticalSpace vheight={1} />
            <div id="content_intro" className="card">
              <div className="card-body">
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <div>
                      <h5>
                        <Trans i18nKey="privacy.table_of_contents.introduction" />
                      </h5>
                      <p className="text-justify">
                        {" "}
                        <Trans i18nKey="privacy.introduction" />
                      </p>
                      <p>
                        <Trans i18nKey="privacy.introduction2" />
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <VerticalSpace vheight={1} />
            <VerticalSpace vheight={1} />
            <div id="content_1" className="card">
              <div className="card-body">
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <div>
                      <h5>
                        <Trans i18nKey="privacy.table_of_contents.who_are_we" />
                      </h5>
                      <p className="text-justify">
                        {" "}
                        <Trans i18nKey="privacy.who_are_we.content" />
                        <Trans i18nKey="privacy.who_are_we.address_6" />
                        <a href="https://wwwen.uni.lu/university/data_protection">
                          https://wwwen.uni.lu/university/data_protection
                        </a>
                        <Trans i18nKey="privacy.who_are_we.address_7" />
                        <a href="mailto:dpo@uni.lu">dpo@uni.lu</a>
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <b>
                      {" "}
                      <Trans i18nKey="privacy.who_are_we.address_headline" />
                    </b>
                  </Col>
                </Row>
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <Trans i18nKey="privacy.who_are_we.address_1" />
                  </Col>
                </Row>
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <Trans i18nKey="privacy.who_are_we.address_2" />
                  </Col>
                </Row>
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <Trans i18nKey="privacy.who_are_we.address_3" />
                  </Col>
                </Row>
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <Trans i18nKey="privacy.who_are_we.address_4" />
                    <a href="tel:+3524666441">(+352) 46 66 44 1</a>
                  </Col>
                </Row>
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <Trans i18nKey="privacy.who_are_we.address_5" />
                    <a href="https://wwwen.uni.lu/university">
                      https://wwwen.uni.lu/university
                    </a>
                  </Col>
                </Row>
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <p className="text-center">
                      {" "}
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d41455.02249757773!2d5.913409730630389!3d49.50454771505392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x47954f0356c15d87%3A0xd5ce92bbd6c6f20a!2sUniversity%20of%20Luxembourg%2C%20Avenue%20de%20l&#39;Universite%2C%20Esch-sur-Alzette!3m2!1d49.504552999999994!2d5.948429!5e0!3m2!1sen!2slu!4v1596124134128!5m2!1sen!2slu"
                        width="600"
                        height="450"
                        style={{
                          border: 0,
                          tabindex: "0",
                          allowfullscreen: "",
                          frameborder: "0",
                        }}
                        aria-hidden="false"
                      ></iframe>
                    </p>
                  </Col>
                </Row>
              </div>
            </div>

            <VerticalSpace vheight={1} />
            <VerticalSpace vheight={1} />

            <div id="content_2" className="card">
              <div className="card-body">
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <div>
                      <h5>
                        <Trans i18nKey="privacy.table_of_contents.purpose" />
                      </h5>
                      <p>
                        {" "}
                        <Trans i18nKey="privacy.purpose" />
                      </p>
                      <p>
                        <Trans i18nKey="privacy.purpose2" />
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <VerticalSpace vheight={1} />
            <VerticalSpace vheight={1} />

            <div id="content_3" className="card">
              <div className="card-body">
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <div>
                      <h5>
                        <Trans i18nKey="privacy.table_of_contents.data_collection" />
                      </h5>
                      <p className="text-justify">
                        {" "}
                        <Trans i18nKey="privacy.how_we_collect_data" />
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <VerticalSpace vheight={1} />
            <VerticalSpace vheight={1} />

            <div id="content_4" className="card">
              <div className="card-body">
                <Row style={{ height: "auto" }}>
                  <Col style={{ margin: "auto" }}>
                    <div>
                      <h5>
                        <Trans i18nKey="privacy.table_of_contents.rights" />
                      </h5>
                      <p className="text-justify">
                        {" "}
                        <Trans i18nKey="privacy.rights" /> <a href="https://wwwen.uni.lu/university/data_protection/your_rights">https://wwwen.uni.lu/university/data_protection/your_rights</a>
                      </p>
                      <p className="text-justify">
                        <Trans i18nKey="privacy.complaint.contact" />
                        <br />
                        <Trans i18nKey="privacy.complaint.a1" />
                        <br />
                        <Trans i18nKey="privacy.complaint.a2" />
                        <br />
                        <Trans i18nKey="privacy.complaint.a3" />
                        <br />
                        <Trans i18nKey="privacy.complaint.a4" />
                        <br />
                        <Trans i18nKey="privacy.complaint.tel" />
                        <a href="tel:+3522610601">(+352) 26 10 60 1</a>
                        <br />
                        <Trans i18nKey="privacy.complaint.fax" />
                        <a href="tel:+35226106029">(+352) 26 10 60 29</a>
                        <br />
                        <Trans i18nKey="privacy.complaint.also_contact" />
                        <a href="https://cnpd.public.lu/fr/support/contact.html">
                          https://cnpd.public.lu/fr/support/contact.html
                        </a>
                      </p>
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
