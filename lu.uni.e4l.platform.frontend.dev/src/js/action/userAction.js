import axios from "axios/index";
import store from '../store'

export function authenticationRequest(email, password){
    const url = `login`;
    const data = {
        email: email,
        password: password
    };

    return {
        type: "AUTHENTICATION_REQUEST",
        payload: axios.post(url, data)
    }
}

export function logout() {
    return {
        type: "LOGOUT",
        payload: null
    }

}

export function signupRequest(email, password) {
    const url = `signup`;
    const data = {
        email: email,
        password: password
    };
    return {
        type: "SIGNUP_REQUEST",
        payload: axios.post(url, data)
    }
}

export function getUser() {

    const url = `users/me`;
    return {
        type: "GET_USER_REQUEST",
        payload: axios.get(url)
    }

}

export function profileUpdateRequest(data) {

    const url = `users/me`;
    return {
        type:"PROFILE_UPDATE_REQUEST",
        payload: axios.post(url, data)
    }

}

export function changeWebsiteLanguage(language) {
    return {
        type: "CHANGE_LANGUAGE",
        payload: language
    }
}


