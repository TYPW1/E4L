import React from "react";
import {signupRequest} from "../action/userAction";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import Col from "react-bootstrap/Col";
import {Trans} from "react-i18next";
import i18n from "../i18n";

@connect((store) => {
    return {
        userReducer: store.userReducer
    }
})
export class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.props.userReducer.error = null;
        this.state = {
            email: '',
            password: '',
            passwordVerification: '',
            submitted:false
        };
    }

    signupRequest = () => {
        this.props.dispatch(signupRequest(this.state.email,this.state.password)).then( () => {
                if (this.props.userReducer.isSignedUp) {
                    this.props.history.push("/login");
                }
            }
        );
    };

    handleInputChange= (event) => {
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit= (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { email, password, passwordVerification } = this.state;
        if (email && password && password===passwordVerification) {
            this.signupRequest();
        }
    };

    render() {
        const { email, password,passwordVerification, submitted } = this.state;
        let error = this.props.userReducer.error ? this.props.userReducer.error.response.data.message : '';
        if (this.props.userReducer.isAuthenticate) {
            return <Redirect to={{pathname: "/" }}/>;
        }

        return (

            <div className="container">
                <div >
                    <div className=" col-md-6 col-md-offset-3" style={{margin: "auto"}}>
                        <div className="card">
                            <div className="card-header ">
                                <h4 className="text-center mb-0"><Trans i18nKey="profile.signup" /></h4>
                            </div>
                            <div className="card-body">
                                {this.props.userReducer.signingUpFailed &&
                                <small id="passwordHelpBlock" className="form-text text-muted"><div style={{color:"brown"}}> {error} </div></small>}
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
                                               autoComplete="new-password"
                                               placeholder={i18n.t("login.password")}
                                        />
                                        {submitted && !password &&
                                        <small id="passwordHelpBlock" className="form-text text-muted"><div style={{color:"brown"}}><Trans i18nKey="login.password_required" /></div></small>
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input name={"passwordVerification"}
                                               className="form-control "
                                               style={{width:"100%"}}
                                               type="password"
                                               value={this.state.passwordVerification}
                                               onChange={this.handleInputChange}
                                               placeholder={i18n.t("signup.password_verification")}
                                        />
                                        {submitted && !passwordVerification &&
                                        <small id="passwordHelpBlock" className="form-text text-muted"><div style={{color:"brown"}}><Trans i18nKey="signup.password_verification_required" /></div></small>
                                        }
                                        {submitted && password!==passwordVerification &&
                                        <small id="passwordHelpBlock" className="form-text text-muted"><div style={{color:"brown"}}><Trans i18nKey="signup.password_verification_not_match" /></div></small>
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    {!this.props.userReducer.isLoggingIn &&
                                    <button className="btn btn-primary btn-block"
                                            type="button"
                                            onClick={this.handleSubmit}
                                    ><Trans i18nKey="profile.signup" /></button>}
                                    {this.props.userReducer.isSigningUp && <Col className="btn btn-block"><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></Col>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>





        )
    }

}