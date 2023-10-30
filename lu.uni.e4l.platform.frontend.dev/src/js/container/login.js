import React from "react";
import {connect} from "react-redux";
import {authenticationRequest, getUser} from "../action/userAction";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import { Link, Redirect } from 'react-router-dom';
import {Trans} from "react-i18next";
import i18n from "../i18n";
import { Loader } from "tabler-react";

import {hideLogoutButton, hideNavButton} from "../action/navAction"


@connect((store) => {
    return {
        userReducer: store.userReducer,
        navReducer:store.navReducer

    }
})
export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.props.userReducer.error = null;
        this.state = {
            email: '',
            password: '',
            submitted:false,
        };
    }
    // componentDidUpdate() {
    //     if(this.state.submitted) {
    //         this.props.dispatch(getUser()).then(this.setState({loaded: true}))         
    //     }

    // }
    componentDidMount() {
        this.props.dispatch(hideNavButton())
        this.props.dispatch(hideLogoutButton())
    }

    authenticationRequest = () => {
        this.props.dispatch(authenticationRequest(this.state.email,this.state.password)).then (() => this.props.dispatch(getUser()) );
    };

    handleInputChange= (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit= (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.authenticationRequest();
        }
    };
    
    render() {
        const { email, password, submitted } = this.state;
        let error = this.props.userReducer.error ? this.props.userReducer.error.response.data.message : '';

        if (this.props.userReducer.isAuthenticate) {
            if(this.props.userReducer.isInfoPending) {
                return <Loader/>;
            }
            if (!this.props.userReducer.isInfoPending && this.props.userReducer.user!=null && this.props.userReducer.user.roles.includes('ADMIN')){
                return <Redirect to={{pathname: "/admin"}}/>;
            }
            else return <Redirect to={{pathname: "/" }}/>;
        }

        return (
            
            <div className="container containerE4l">
                <div className="row" >

                    <div className=" col-md-6 col-md-offset-3" style={{margin: "auto"}}>
                        <div className="card">
                            <div className="card-header ">
                                <h4 className="text-center mb-0"><Trans i18nKey="profile.login" /></h4>
                            </div>
                            <div className="card-body">
                                {this.props.userReducer.error &&
                                    <div className="alert alert-danger" >
                                    {error}
                                    </div>}
                                <div className="form-group">
                                    <div className="input-group">
                                        <input name={"email"}
                                               className="form-control "
                                               style={{width:"100%"}}
                                               type="text"
                                               value={this.state.email}
                                               onChange={this.handleInputChange}
                                               placeholder={i18n.t("login.email")}/>
                                        {submitted && !email &&
                                        <small id="passwordHelpBlock" className="form-text text-muted" ><div style={{color:"brown"}}><Trans i18nKey="login.email_required" /></div></small>
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input name={"password"}
                                               className="form-control "
                                               style={{width:"100%"}}
                                               type="password"
                                               value={this.state.password}
                                               onChange={this.handleInputChange}
                                               placeholder={i18n.t("login.password")}
                                        />
                                        {submitted && !password &&
                                        <small id="passwordHelpBlock" className="form-text text-muted"><div style={{color:"brown"}}><Trans i18nKey="login.password_required" /></div></small>
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    {!this.props.userReducer.isLoggingIn &&
                                    <button className="btn btn-primary btn-block"
                                            type="button"
                                            onClick={this.handleSubmit}
                                    ><Trans i18nKey="profile.login" /></button>}
                                    {this.props.userReducer.isLoggingIn &&
                                    <Col className="btn btn-block"><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></Col>}
                                </div>
                                {/* <div className="form-group">
                                    <Link to="/signup"><Button variant="light" className=" btn-block"
                                                               type="button"
                                    ><Trans i18nKey="profile.signup" /></Button></Link>
                                </div> */}
                            </div>
                        </div>
                    </div>



                </div>


            </div>







        )
        }
        }


