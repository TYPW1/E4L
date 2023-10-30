import React from "react";
import Container from "react-bootstrap/Container";
import {Trans} from "react-i18next";
import fstm from "../../public/img/sponsors/fstm.png";
import fnr from "../../public/img/sponsors/fnr.png";
import bics from "../../public/img/sponsors/bics.png"
import lem from "../../public/img/sponsors/lem.png"
import lpv from "../../public/img/sponsors/lpv.png"
import scienteens from "../../public/img/sponsors/scienteens-lab.png"
import {Col, Image, Row} from "react-bootstrap";

export class Sponsors extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <div className="card">
                        <div className="card-header ">
                            <h4 className="text-center">
                                <Trans i18nKey="sponsors.sponsors"/>
                            </h4>
                        </div>
                        <div className="card-body">
                            <Row className="justify-content-center" style={{textAlign: "center"}}>
                                <Col xs={6} md={4} style={{marginBottom: "35px"}}>
                                    <div className="img-container">
                                        <a href="https://wwwen.uni.lu/fstm/" target="_blank">
                                            <Image src={fstm} fluid/>
                                        </a>
                                    </div>
                                    Funded internship in summer 2019 and graphical support by
                                    the <a href="https://wwwfr.uni.lu/fstm/communication_tools" target="_blank">
                                        Communication Team
                                    </a>
                                </Col>
                                <Col xs={6} md={4} style={{marginBottom: "35px"}}>
                                    <div className="img-container">
                                        <a href="https://www.fnr.lu/" target="_blank">
                                            <Image src={fnr} fluid/>
                                        </a>
                                    </div>
                                    Fund the project via the PSP-Classic 2020-1 (Ref: 14590759 Energy Balance)
                                </Col>
                                <Col xs={6} md={4} style={{marginBottom: "35px"}}>
                                    <div className="img-container">
                                        <a href="https://bics.uni.lu/" target="_blank">
                                            <Image src={bics} fluid/>
                                        </a>
                                    </div>
                                    Funded internship in summer 2019 and graphical support by the Communication Team
                                </Col>
                            {/*</Row>*/}
                            {/*<Row className="justify-content-center" style={{textAlign: "center"}}>*/}
                                <Col xs={6} md={4} style={{marginBottom: "35px"}}>
                                    <div className="img-container">
                                        <a href="https://wwwen.uni.lu/research/fstm/dphyms/research/energy_materials" target="_blank">
                                            <Image src={lem} fluid/>
                                        </a>
                                    </div>
                                    Members of the Laboratory for Energy Materials (LEM) volunteer their time to the
                                    project, and LEM has funded several internships for developing the website
                                </Col>
                                <Col xs={6} md={4} style={{marginBottom: "35px"}}>
                                    <div className="img-container">
                                        <a href="https://wwwen.uni.lu/research/fstm/dphyms/research/photovoltaics" target="_blank">
                                            <Image src={lpv} fluid/>
                                        </a>
                                    </div>
                                    Members of the Laboratory for Photovoltaics (LPV) volunteer their time to the project
                                    contributing their expertise
                                </Col>
                                <Col xs={6} md={4} style={{marginBottom: "35px"}}>
                                    <div className="img-container">
                                        <a href="https://wwwen.uni.lu/lcsb/scienteens_lab" target="_blank">
                                            <Image src={scienteens} fluid/>
                                        </a>
                                    </div>
                                    The Scienteens lab members supported the development of this website and the energy
                                    balance project
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
