import React from "react";
import {profileUpdateRequest} from "../action/userAction";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import Select from "react-select";
import {Col, Form} from "react-bootstrap";
import languageOptions from '../../public/profile/langs.json';
import {Trans} from "react-i18next";
import i18n from "../i18n";

@connect((store) => {
    return {
        userReducer: store.userReducer
    }
})
export class Profile extends React.Component {


    constructor(props) {
        super(props);
        let user = this.props.userReducer.user ? this.props.userReducer.user : {};
        this.state = {
            id: user.id ? user.id : '' ,
            language: user.language ? user.language : '',
            age: user.age ? user.age : '',
            country: user.country ? user.country : '',
            nationality: user.nationality? user.nationality : '',
            nucleusComposition: user.nucleusComposition ? user.nucleusComposition: '',
            lessEnergy: user.lessEnergy!==undefined? user.lessEnergy : null,
            submitted: false,
            isUpdated: false
        };
    }

    getLabelByValue = (object, value) => {
        return object.filter( obj => obj.value === value)[0]
    }

    handleInputChange= (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleSubmit= (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        let profileUpdate = Object.assign({}, this.state);
        delete profileUpdate.submitted;
        delete profileUpdate.isUpdated;
        this.props.dispatch(profileUpdateRequest(profileUpdate));
        this.state.isUpdated = true;

    };


    render() {
        if (!this.props.userReducer.isAuthenticate) {
            return <Redirect to={{pathname: "/login" }}/>;
        }


        const nationalityOptions = [
            {
                "label": i18n.t("profile.nationalities.luxembourg"),
                "value": "lu"
            },
            {
                "label": i18n.t("profile.nationalities.belgium"),
                "value": "be"
            },
            {
                "label": i18n.t("profile.nationalities.france"),
                "value": "fr"
            },
            {
                "label": i18n.t("profile.nationalities.germany"),
                "value": "ger"
            },
            {
                "label": i18n.t("profile.nationalities.other"),
                "value": "other"
            }
        ];

        const countryOptions = [
            {
                "label": i18n.t("profile.country.luxembourg"),
                "value": "lu"
            },
            {
                "label": i18n.t("profile.country.belgium"),
                "value": "be"
            },
            {
                "label": i18n.t("profile.country.france"),
                "value": "fr"
            },
            {
                "label": i18n.t("profile.country.germany"),
                "value": "ger"
            },
            {
                "label": i18n.t("profile.country.other"),
                "value": "other"
            }
        ];

        const nucleusCompositionOptions = [
            {
                "label": i18n.t("profile.persons.one"),
                "value": "1"
            },
            {
                "label": i18n.t("profile.persons.two"),
                "value": "2"
            },
            {
                "label": i18n.t("profile.persons.three"),
                "value": "3"
            },
            {
                "label": i18n.t("profile.persons.four"),
                "value": "4"
            },
            {
                "label": i18n.t("profile.persons.five_plus"),
                "value": ">4"
            }
        ];

        const lessEnergyOptions = [
            {
                "label": i18n.t("yes"),
                "value": true
            },
            {
                "label": i18n.t("no"),
                "value": false
            }
        ];

        const ageOptions = [
            {
                "label": "0-17",
                "value": "0-17"
            },
            {
                "label": "18-30",
                "value": "18-30"
            },
            {
                "label": "31-50",
                "value": "31-50"
            },
            {
                "label": "51-70",
                "value": "51-70"
            },
            {
                "label": "71+",
                "value": "71+"
            }
        ];

        return (

            <div className="container">
                <div >
                    <div className=" col-md-10 col-md-offset-5" style={{margin: "auto"}}>
                        <div className="card">
                            <div className="card-header ">
                                <h4 className="text-center mb-0"><Trans i18nKey="profile.profile_update" /></h4>
                            </div>
                            <div className="card-body">
                                {this.state.isUpdated &&
                                    <div className="alert alert-success">
                                        <Trans i18nKey="profile.profile_updated" />
                                    </div>}
                                <Form >
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridLanguage">
                                            <Form.Label><Trans i18nKey="profile.preferred_lang" /></Form.Label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={this.getLabelByValue(languageOptions,this.state.language)}
                                                isClearable={false}
                                                onChange={(v, e) => this.handleInputChange({target:{value: v ? v.value : v, name: "language"}})}
                                                isSearchable={true}
                                                name={"language"}
                                                options={languageOptions}
                                                placeholder={i18n.t("profile.select")}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}  controlId="formGridAge">
                                            <Form.Label><Trans i18nKey="profile.age" /></Form.Label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={this.getLabelByValue(ageOptions,this.state.age)}
                                                isClearable={true}
                                                onChange={(v, e) => this.handleInputChange({target:{value: v ? v.value : v, name: "age"}})}
                                                isSearchable={true}
                                                name={"age"}
                                                options={ageOptions}
                                                placeholder={i18n.t("profile.select")}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}  controlId="formGridCountry">
                                            <Form.Label><Trans i18nKey="profile.residence_country" /></Form.Label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={this.getLabelByValue(countryOptions,this.state.country)}
                                                isClearable={true}
                                                onChange={(v, e) => this.handleInputChange({target:{value: v ? v.value : v, name: "country"}})}
                                                isSearchable={true}
                                                name={"country"}
                                                options={countryOptions}
                                                placeholder={i18n.t("profile.select")}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}  controlId="formGridNationality">
                                            <Form.Label><Trans i18nKey="profile.nationality" /></Form.Label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={this.getLabelByValue(nationalityOptions,this.state.nationality)}
                                                isClearable={true}
                                                onChange={(v, e) => this.handleInputChange({target:{value: v ? v.value : v, name: "nationality"}})}
                                                isSearchable={true}
                                                name={"nationality"}
                                                options={nationalityOptions}
                                                placeholder={i18n.t("profile.select")}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}  controlId="formGridNucleus">
                                            <Form.Label><Trans i18nKey="profile.people_count" /></Form.Label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={this.getLabelByValue(nucleusCompositionOptions,this.state.nucleusComposition)}
                                                isClearable={true}
                                                onChange={(v, e) => this.handleInputChange({target:{value: v ? v.value : v, name: "nucleusComposition"}})}
                                                isSearchable={true}
                                                name={"nucleusComposition"}
                                                options={nucleusCompositionOptions}
                                                placeholder={i18n.t("profile.select")}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}  controlId="formGridLessEnergy">
                                            <Form.Label><Trans i18nKey="profile.less_energy" /></Form.Label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={this.getLabelByValue(lessEnergyOptions,this.state.lessEnergy)}
                                                isClearable={true}
                                                onChange={(v, e) => this.handleInputChange({target:{value: v ? v.value : v, name: "lessEnergy"}})}
                                                isSearchable={true}
                                                name={"lessEnergy"}
                                                options={lessEnergyOptions}
                                                placeholder={i18n.t("profile.select")}
                                            />
                                        </Form.Group>
                                    </Form.Row>


                                    <button className="btn btn-primary btn-block"
                                            type="button"
                                            onClick={this.handleSubmit}
                                    ><Trans i18nKey="profile.update" /></button>
                                </Form>
                                <div className="form-group">
                                    {this.props.userReducer.isSigningUp && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>





        )
    }

}