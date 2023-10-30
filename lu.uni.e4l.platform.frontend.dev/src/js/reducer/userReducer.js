import axios from "axios";
import {getUser} from "../action/userAction";
import i18n from "../i18n";

const initState = {
    isAuthenticate: false,
    token: null,
    user: null,
    loginFailed: false,
    error: null,
    isLoggingIn:false,
    isSignedUp:false,
    isSigningUp:false,
    signingUpFailed:false,
    isInfoPending:false,
    isInfoReceived:false,
    lang: "en"
};

export function userReducer(state=initState, action){
    switch (action.type) {
        case "AUTHENTICATION_REQUEST_PENDING":{
            return Object.assign({},state,
                {
                    isLoggingIn:true,
                    error: null,
                    isInfoPending: true,
                    loginFailed: false
                });
        }
        case "AUTHENTICATION_REQUEST_REJECTED":{
            return Object.assign({},state,
                {
                    isAuthenticate: false,
                    token: null,
                    user:null,
                    error: action.payload,
                    loginFailed: true,
                    isLoggingIn:false
                });
        }
        case "AUTHENTICATION_REQUEST_FULFILLED":{

            return Object.assign({},state,
                {
                    isAuthenticate: true,
                    token: action.payload.data,
                    loginFailed: false,
                    isLoggingIn:false,
                    error: null,
                    isSignedUp:true
                });

        }

        case "SIGNUP_REQUEST_PENDING":{
            return Object.assign({},state,
                {
                    isSigningUp:true
                });
        }
        case "SIGNUP_REQUEST_REJECTED":{
            return Object.assign({},state,
                {
                    isSigningUp:false,
                    error: action.payload,
                    signingUpFailed:true
                });
        }
        case "SIGNUP_REQUEST_FULFILLED":{
            return Object.assign({},state,
                {
                    isSigningUp:false,
                    isSignedUp:true
                });

        }

        case "LOGOUT":{
            return Object.assign({},state,
                {
                    isAuthenticate: false,
                    token: null,
                    user: null,
                    loginFailed: false,
                    error: null,
                    isLoggingIn:false,
                    isSignedUp:false,
                    isSigningUp:false,
                    signingUpFailed:false,
                });

        }

        case "GET_USER_REQUEST_PENDING":{
            return Object.assign({},state,
                {
                    isInfoPending: true
                });
        }
        case "GET_USER_REQUEST_REJECTED":{
            return Object.assign({},state,
                {
                    isInfoPending: true
                });
        }
        case "GET_USER_REQUEST_FULFILLED":{
            return Object.assign({},state,
                {
                    isInfoPending: false,
                    isInfoReceived:true,
                    user: action.payload.data
                });
        }

        case "PROFILE_UPDATE_REQUEST_PENDING":{
            return state;
        }
        case "PROFILE_UPDATE_REQUEST_REJECTED":{
            return state;
        }
        case "PROFILE_UPDATE_REQUEST_FULFILLED":{
            return Object.assign({},state,
                {
                    user: action.payload.data
                });
        }
        case "CHANGE_LANGUAGE": {

            i18n.changeLanguage(action.payload);

            return Object.assign({},state,
                {
                    lang: action.payload
                });
        }
    }
    return state;
}