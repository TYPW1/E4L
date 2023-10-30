import axios from "axios/index";

export function seminarCreateRequest(data) {
    const url = `seminar`;
    return {
        type: "SEMINAR_CREATE_REQUEST",
        payload: axios.post(url,data)
    }
}

export function seminarPutRequest(seminarId, data) {
    const url = `seminar/update`;
    return {
        type: "SEMINAR_PUT_REQUEST",
        payload: axios.put(url,data)
    }
}

export function seminarStatusPutRequest(data) {
    const url = `seminar/update`;
    return {
        type: "SEMINAR_STATUS_PUT_REQUEST",
        payload: axios.put(url,data)
    }
}

export function seminarDeleteRequest(data) {
    const url = `seminar`;
    return {
        type: "SEMINAR_DELETE_REQUEST",
        payload: axios.delete(url,{data: data})
    }
}

export function seminarListGetRequest() {
    const url = `seminarlist`;
    return {
        type: "SEMINAR_LIST_GET_REQUEST",
        payload: axios.get(url)
    }
}

export function seminarsGetRequest() {
    const url = `seminars`;
    return {
        type: "SEMINARS_GET_REQUEST",
        payload: axios.get(url)
    }
}

export function seminarComputeEnergy(seminar_access_code) {
    const url = `/calculate/seminar/${seminar_access_code}`;
    return {
        type: "SEMINAR_COMPUTE_ENERGY",
        payload: axios.get(url)
    }
}