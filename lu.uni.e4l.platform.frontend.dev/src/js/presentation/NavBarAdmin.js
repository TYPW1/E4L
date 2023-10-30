import Navbar from "react-bootstrap/Navbar";
import uni_logo from "../../public/img/uni-lu-logo.svg";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import { logout } from "../action/userAction";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
    fetchQuestionnaire,
    fetchSessionCount,
} from "../action/questionnaireAction";
import {
    MDBNavItem,
    MDBNavLink,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownDivider, 
    MDBIcon,
} from "mdbreact";
import { Trans } from "react-i18next";
import i18n from "../i18n";
import React from "react";
import { changeWebsiteLanguage } from "../action/userAction";

@connect((store) => {
    return {
        userReducer: store.userReducer,
        questionnaireReducer: store.questionnaireReducer,
        navReducer: store.navReducer,
    };
})
export class NavBarAdmin extends React.Component {
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

    changeLanguage = (lang) => {
        this.props.dispatch(changeWebsiteLanguage(lang));
    };

    render() {
        const hidden = {
            
          };
        return (
        
        <Navbar className="bg-white">
          <Link to="/">
            <Navbar.Brand>
              <img src={uni_logo} style={{ width: "5em" }} />
              Energy4Life
            </Navbar.Brand>
          </Link>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
                {/*{!this.props.userReducer.isAuthenticate &&*/}
                {/*<Link className="padding" to="/login"><Trans i18nKey="profile.login"/></Link>}*/}
                {/*{!this.props.userReducer.isAuthenticate &&*/}
                {/*<Link className="padding" to="/signup"><Trans i18nKey="profile.signup"/></Link>}*/}
                {this.props.userReducer.isAuthenticate &&
                <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                            {this.props.userReducer.user && this.props.userReducer.user.email}
                            <MDBIcon style={{paddingLeft: "10px"}} icon="user"/>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default dropdownProfileIcon">
                            {/*<MDBDropdownItem><Link active="true" to=""><Trans i18nKey="profile.change_email"/>*/}
                            {/*</Link></MDBDropdownItem>*/}
                            {/*<MDBDropdownItem><Link active="true" to=""><Trans i18nKey="profile.change_password"/>*/}
                            {/*</Link></MDBDropdownItem>*/}
                            {/*<MDBDropdownItem><Link active="true" to="/profile"><Trans i18nKey="profile.profile_update"/>*/}
                            {/*</Link></MDBDropdownItem>*/}
                            {/*<div className="dropdown-divider"/>*/}
                            <MDBDropdownItem onClick={this.logout}><Link to="/"><Trans i18nKey="profile.logout"/>
                            </Link></MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavItem>
                }
              <Link to="/">
                <button type="button" className="btn btn-primary mr-3">
                  <Trans i18nKey="home.home" />
                </button>
              </Link>
              <Link to="/mission">
                <button type="button" className="btn btn-primary mr-3">
                  <Trans i18nKey="mission.our_mission" />
                </button>
              </Link>
              <Link to="/team">
                <button type="button" className="btn btn-primary mr-3">
                  <Trans i18nKey="team.team" />
                </button>
              </Link>
              <Link to="/contactus">
                <button type="button" className="btn btn-primary mr-3">
                  <Trans i18nKey="contact.contact_us" />
                </button>
              </Link>
              {/* <Link to="/login">
                <button type="button" className="btn btn-primary mr-3">
                  <Trans i18nKey="login.login_signup" />
                </button>
              </Link> */}
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    {this.getCurrentLanguage()}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default dropdownProfileIcon">
                    <MDBDropdownItem onClick={() => this.changeLanguage("en")}>
                      EN
                    </MDBDropdownItem>
                    {/*<MDBDropdownItem onClick={() => this.changeLanguage("de")}>DE</MDBDropdownItem>*/}
                    {/*<MDBDropdownItem onClick={() => this.changeLanguage("lu")}>LU</MDBDropdownItem>*/}
                    <MDBDropdownItem onClick={() => this.changeLanguage("fr")}>
                      FR
                    </MDBDropdownItem>
                    <MDBDropdownItem onClick={() => this.changeLanguage("ge")}>
                      GE
                    </MDBDropdownItem>
                    <MDBDropdownItem onClick={() => this.changeLanguage("lu")}>
                      LU
                    </MDBDropdownItem>
                    {/* <MDBDropdownItem onClick={() => this.changeLanguage("ru")}>
                      RU
                    </MDBDropdownItem> */}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        );
    }
}
