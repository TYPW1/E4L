import Navbar from "react-bootstrap/Navbar";
import uni_logo from "../../public/img/uni-lu-logo.svg";
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {connect} from "react-redux";
import {logout} from "../action/userAction";
import {Trans} from "react-i18next";
import i18n from "../i18n";
import React from "react";
import {changeWebsiteLanguage} from "../action/userAction";
import {NavDropdown} from "react-bootstrap";

@connect((store) => {
    return {
        userReducer: store.userReducer,
        questionnaireReducer: store.questionnaireReducer,
        navReducer: store.navReducer,
        seminarReducer: store.seminarReducer,
    };
})
export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reloaded: 0,
        };
    }

    logout = () => {
        this.props.dispatch(logout());
    };

    getCurrentLanguage = () => {
        return this.props.userReducer.lang.toUpperCase();
    };

    componentDidMount() {
    }

    changeLanguage = (lang) => {
        this.props.dispatch(changeWebsiteLanguage(lang));
    };

    render() {
        let navButtonsEnabled = this.props.navReducer.isNavButtonsDisabled == "true";

        return (
            <div className="container containerE4l">
                <Navbar className="bg-white" expand="lg">
                    <Link to="/">
                        <Navbar.Brand>
                            <img src={uni_logo} style={{width: "5em"}}/>
                            Energy4Life
                        </Navbar.Brand>
                    </Link>
                    <Nav className="justify-content-start"
                         style={navButtonsEnabled ? {display: "none"} : null}
                    >
                        <NavDropdown style={{marginTop: "-2px"}} title={this.getCurrentLanguage()}
                                     id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => this.changeLanguage("en")}>
                                EN
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.changeLanguage("fr")}>
                                FR
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.changeLanguage("de")}>
                                DE
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.changeLanguage("lu")}>
                                LU
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"
                                   style={navButtonsEnabled ? {display: "none"} : null}/>
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="mr-auto" className="justify-content-end"
                             style={navButtonsEnabled ? {display: "none"} : null}
                        >
                            <Nav.Link>
                                <Link to="/">
                                    <Trans i18nKey="home.home"/>
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/mission">
                                    <Trans i18nKey="mission.mission"/>
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/news">
                                    <Trans i18nKey="news.news"/>
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/seminarHome">
                                    <Trans i18nKey="seminar.home"/>
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/team">
                                    <Trans i18nKey="team.team"/>
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/sponsors">
                                    <Trans i18nKey="sponsors.sponsors"/>
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/info">
                                    <Trans i18nKey="info.info"/>
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/contactus">
                                    <Trans i18nKey="contact.contact_us"/>
                                </Link>
                            </Nav.Link>
                            {this.props.userReducer.isAuthenticate && this.props.userReducer.user
                            && this.props.userReducer.user.roles.includes('ADMIN') &&
                            <Nav.Link>
                                <Link to="/admin">
                                    Admin
                                </Link>
                            </Nav.Link>
                            }
                            {this.props.userReducer.isAuthenticate && this.props.userReducer.user &&
                            <NavDropdown title={this.props.userReducer.user.email} id="userinfo-dropdown">
                                <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
