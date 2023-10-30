import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import phillip_dale from "../../public/img/team/phillip_dale.png";
import robert_a_p_reuter from "../../public/img/team/robert_a.p_reuter.png";
import michele_melchiorre from "../../public/img/team/michele_melchiorre.png";
import max_h_wolter from "../../public/img/team/max_h_wolter.png";
import alice_debot from "../../public/img/team/alice_debot.png";
import alfredo_capozucca from "../../public/img/team/alfredo_capozucca.png";
import conrad_spindler from "../../public/img/team/Conrad_Spindler.png";
import david_kieffer from "../../public/img/team/David_Kieffer.jpg";
import jonathan_rommelfangen from "../../public/img/team/Jonathan_Rommelfangen.png";
import vanitha_varadharajan from "../../public/img/team/Vanitha_Varadharajan.png"
import biewesch_kevin from "../../public/img/team/biewesch_kevin.jpg"
import BLAZQUEZ_alfredo from "../../public/img/team/BLAZQUEZ_Alfredo.jpeg"
import thibault_simonetto from "../../public/img/team/Thibault_Simonetto.png"
import venkat from "../../public/img/team/venkat.png"
import anon_m from "../../public/img/team/anon_m.png"
import joana from "../../public/img/team/joana.jpeg"
import ricardo_poeira from "../../public/img/team/Ricardo_Poeira.png"
import boris from "../../public/img/team/boris.jpg"
import romain from "../../public/img/team/romain.png"
import una_k from "../../public/img/team/Una_Karahasanovic.jpg"

import {Trans} from "react-i18next";
import {Card, Image} from "react-bootstrap";

export class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMember: -1
        }
    }

    selectMember = (i) => {
        this.setState({
            selectedMember: i
        })
    }

    render() {
        let selected = this.state.selectedMember < 0 ? null : this.team[this.state.selectedMember];
        return (
            <React.Fragment>
                <Container>
                    <Card>
                        <Card.Header>
                            <h4 style={{width: "100%", textAlign: "center"}}>
                                <Trans i18nKey="team.who_are_we"/>
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            {!selected &&
                            <Row className="justify-content-center" style={{textAlign: "center"}}>
                                {this.team.map((m, i) =>
                                    <Col xs={6} md={3} style={{marginBottom: "35px"}} key={i}>
                                        <span style={{cursor: "pointer"}} onClick={(e) => this.selectMember(i)}>
                                            <div className="img-container">
                                                <Image src={`${m.img}`} fluid/>
                                            </div>
                                            <h5>{m.name}</h5>
                                        </span>
                                    </Col>)}
                            </Row>}
                            {selected && <span>
                                <Button variant="link" onClick={(e) => this.selectMember(-1)}>
                                    <i className="fa fa-angle-left" /> <Trans i18nKey="team.back"></Trans>
                                </Button>
                                <Row>
                                    <Col md={4}>
                                        <div className="img-container" style={{height: "300px"}}>
                                            <Image src={`${selected.img}`} fluid/>
                                        </div>
                                    </Col>
                                    <Col style={{paddingTop: "10px"}}>
                                        <h5>{selected.name}</h5>
                                        <span>
                                            {selected.info()}
                                        </span>
                                    </Col>
                                </Row>
                            </span>}
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        );
    }

    team = [
        {
            name: "Dr. Phillip Dale",
            img: phillip_dale,
            info: () => <Trans i18nKey="team.members.phillipd"><a href="https://wwwen.uni.lu/research/fstm/dphyms/research/energy_materials" /></Trans>
        },
        {
            name: "Alice Debot",
            img: alice_debot,
            info: () => <Trans i18nKey="team.members.aliced"><a href="https://wwwen.uni.lu/research/fstm/dphyms/research/photovoltaics" /></Trans>
        },
        {
            name: "Dr. Robert A.P. Reuter",
            img: robert_a_p_reuter,
            info: () => <Trans i18nKey="team.members.robertr"><a href="https://wwwen.uni.lu/research/fhse/desw/people/robert_reuter" /></Trans>
        },
        {
            name: "Jonathan Rommelfangen",
            img: jonathan_rommelfangen,
            info: () => <Trans i18nKey="team.members.jonathanr" />
        },
        {
            name: "Dr. Conrad Spindler",
            img: conrad_spindler,
            info: () => <Trans i18nKey="team.members.conrads" />
        },
        {
            name: "Dr. Alfredo Capozucca",
            img: alfredo_capozucca,
            info: () => <Trans i18nKey="team.members.alfredoc"><a href='https://acapozucca.github.io/'/></Trans>
        },
        {
            name: "Dr. Michele Melchiorre",
            img: michele_melchiorre,
            info: () => <Trans i18nKey="team.members.michelem"><a href='https://wwwfr.uni.lu/recherche/fstm/dphyms/research/photovoltaics'/></Trans>
        },
        {
            name: "Vanitha Varadharajan",
            img: vanitha_varadharajan,
            info: () => <Trans i18nKey="team.members.vanithav"><a href='https://www.linkedin.com/in/vanitha-varadharajan-663942a0/'/></Trans>
        },
        {
            name: "Dr. Max H. Wolter",
            img: max_h_wolter,
            info: () => <Trans i18nKey="team.members.maxw"><a href='https://wwwfr.uni.lu/recherche/fstm/dphyms/research/photovoltaics'/></Trans>
        },
        {
            name: "David Kieffer",
            img: david_kieffer,
            info: () => <Trans i18nKey="team.members.davidk" />
        },
        {
            name: "Thibault Simonetto",
            img: thibault_simonetto,
            info: () => <Trans i18nKey="team.members.thibaults" />
        },
        {
            name: "Kevin Biewesch",
            img: biewesch_kevin,
            info: () => <Trans i18nKey="team.members.kevinb" />
        },
        {
            name: "Alfredo Blazquez",
            img: BLAZQUEZ_alfredo,
            info: () => <Trans i18nKey="team.members.alfredob"><a href="https://pace.uni.lu/the-team/" /></Trans>
        },
        {
            name: "Boris Floka",
            img: boris,
            info: () => <Trans i18nKey="team.members.borisf" />
        },
        {
            name: "Romain Roland",
            img: romain,
            info: () => <Trans i18nKey="team.members.romainr"><a href="https://www.linkedin.com/in/romain-roland-5783511b9/" /></Trans>
        },
        {
            name: "Venkateshwaran Thamilselvan",
            img: venkat,
            info: () => <Trans i18nKey="team.members.venkateshwarant"><a href="https://www.linkedin.com/in/venkateshwaran-thamilselvan" /></Trans>
        },
        {
            name: "Joana Ferreira",
            img: joana,
            info: () => <Trans i18nKey="team.members.joanaf" />
        },
        {
            name: "Ricardo Poeira",
            img: ricardo_poeira,
            info: () => <Trans i18nKey="team.members.ricardop"><a href="https://pace.uni.lu/the-team/" /></Trans>
        },
        {
            name: "Dr. Una Karahasanovic",
            img: una_k,
            info: () => <Trans i18nKey="team.members.unak"><a href="https://pace.uni.lu/the-team/" /></Trans>
        }
    ].sort((a, b) => a.name.split(" ").reverse()[0] > b.name.split(" ").reverse()[0] ? 1 : -1)
}
