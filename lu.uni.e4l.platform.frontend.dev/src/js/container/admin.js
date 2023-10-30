import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import Row from "react-bootstrap/Row";
import { profileUpdateRequest } from "../action/userAction";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Select from "react-select";
import { Col, Form } from "react-bootstrap";
import languageOptions from '../../public/profile/langs.json';
import { Trans } from "react-i18next";
import i18n from "../i18n";
import { Link } from "react-router-dom";
import { hideNavButton, showLogoutButton, showNavButton } from "../action/navAction";
import { getUser } from "../action/userAction"
import navReducer from "../reducer/navReducer";
import regeneratorRuntime from "regenerator-runtime";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from 'react-bootstrap';
import { Seminar } from "./seminar";

import NavBarAdmin from "../presentation/NavBarAdmin";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {FixedSizeList} from "react-window";

import {
    fetchQuestionnaire,
    nextPage,
    previousPage,
    restartQuestionnaire,
    resumeQuestionnaire,
    computeEnergy,
} from "../action/questionnaireAction";
import { Column } from "react-virtualized";
import { MDBBreadcrumbItem } from "mdbreact";


@connect((store) => {
    return {
        questionnaireReducer: store.questionnaireReducer,
        userReducer: store.userReducer,
        navReducer: store.navReducer
    }
})
export class AdminDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        // this.props.dispatch(showLogoutButton())
        // this.props
        // .dispatch(getUser())
        // .then(this.setState({ loaded: true }));
        // this.props.dispatch(hideNavButton()).then(this.setState({ loaded: true }));
        // const get_user = this.props.dispatch(getUser())

    }

    render() {
        // console.log(this.props.navReducer.isNavButtonsDisabled)
        // if (this.state.loaded) {
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


        return (
            <React.Fragment>
                <Container>
                    <Tabs>
                        <TabList>
                            <Tab style={{ margin: "1pt" }}>Seminars</Tab>
                            <Tab style={{ margin: "1pt" }}>Users</Tab>
                            <Tab style={{ margin: "1pt" }}>Questionnaire</Tab>
                            <Tab style={{ margin: "1pt" }}>Static Content</Tab>
                        </TabList>
                        <TabPanel>
                        <Seminar/>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                    </Tabs>
                </Container>

            </React.Fragment>
        )
        // }
        // else {
        //     return <div>nothing 2</div>
        // }
    }
}
