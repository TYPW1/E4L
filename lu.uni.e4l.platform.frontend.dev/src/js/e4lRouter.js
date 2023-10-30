import { Questionnaire } from "./container/questionnaire.js";
import { Mission } from "./container/mission.js";
import { News } from "./container/news.js";
import { Team } from "./container/team.js";
import { ContactUs } from "./container/contactus.js";
import { PrivacyNotice } from "./container/privacyNotice.js";
import { Home } from "./container/home.js";
import { SeminarHome } from "./container/seminarHome.js";
import { NavBar } from "./presentation/NavBar";
import React from "react";
import { connect } from "react-redux";
import axios from "axios/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { VerticalSpace } from "./presentation/verticalSpace.js";
import { Login } from "./container/login.js";
import { Signup } from "./container/signup";
import { Profile } from "./container/profile";
import {AdminDashboard } from "./container/admin";
import {ResultSeminar} from "./container/resultSeminar";
import jwt from "jwt-decode";

import i18n from "./i18n";
import { Result } from "./container/result";
import { Footer } from "./presentation/footer.js";
import {Sponsors} from "./container/sponsors";
import {Info} from "./container/info";
import {logout} from "./action/userAction";

@connect((store) => {
  return {
    userReducer: store.userReducer,
  };
})
export default class E4lRouter extends React.Component {
  render() {
    let baseName = window.location.hostname == "localhost" ? "" : "PUBLIC_PATH";

    axios.defaults.headers.common["Authorization"] = this.props.userReducer
      .token
      ? `Bearer ${this.props.userReducer.token}`
      : "";

    axios.interceptors.request.use((config) => {
      try {
        const token = axios.defaults.headers.common["Authorization"];
        if (!token)
          return config;

        const decodedToken = jwt(token.split(" ")[1], {complete: true});

        if (decodedToken.exp < (new Date().getTime() / 1000)) {
          console.log("Token expired. Logging out...")
          this.props.dispatch(logout());
        }
      } catch (e) {
        console.log(e)
      }
      return config
    })

    if (this.props.userReducer.lang) {
      i18n.changeLanguage(this.props.userReducer.lang);
      axios.defaults.headers.common[
        "accept-language"
      ] = this.props.userReducer.lang;
    } else {
      delete axios.defaults.headers.common["accept-language"];
    }

    

    return (
      <Router basename={baseName}>
        <div>
          <NavBar />
          <VerticalSpace vheight={2.5} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/calculator" component={Questionnaire} />
            <Route path="/mission" component={Mission} />
            <Route path="/news" component={News} />
            <Route path="/seminarHome" component={SeminarHome} />
            <Route path="/team" component={Team} />
            <Route path="/sponsors" component={Sponsors} />
            <Route path="/info" component={Info} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/privacyNotice" component={PrivacyNotice} />
            <Route path="/login" component={Login} />
            {/* <Route path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} /> */}
            <Route path="/result/:sessionId" component={Result} />
            <Route path="/resultSeminar/:accessCode" component={ResultSeminar} />
            <Route path="/admin" component={AdminDashboard} />
            <Route component={Home} />
          </Switch>
          <Route component={Footer} />
        </div>
      </Router>
    );
  }
}
