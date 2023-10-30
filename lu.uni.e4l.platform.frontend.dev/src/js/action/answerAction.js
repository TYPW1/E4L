import axios from "axios/index";

export function selectPossibleAnswer(possibleAnswerId, variable) {
  return {
    type: "SELECT_ANSWER",
    payload: { possibleAnswerId, variable },
  };
}
export function unselectPossibleAnswer(possibleAnswerId, variableId) {
  return {
    type: "UNSELECT_ANSWER",
    payload: { possibleAnswerId, variableId },
  };
}

export function sendSession(session ) {
  let url=''
  if(session.seminar_access_code!=null){
    url = `/session/${session.seminar_access_code}`;
  } else {
    url = `/session`
  }
  return {
    type: "SEND_SESSION",
    payload: axios.post(url, session),
  };
}

export function computeEnergy(session) {
  const url = "/calculate/energyConsumption";
  console.log("Session: " + session);
  return {
    type: "COMPUTE_ENERGY",
    payload: axios.post(url, session),
  };
}

export function emptySession() {
  return {
    type: "EMPTY_SESSION",
    payload: null,
  };
}

export function fetchResult(sessionId) {
  return {
    type: "FETCH_RESULT",
    payload: axios.get(`/calculate/session/${sessionId}`),
  };
}

export function setSeminarInSession(seminar_access_code) {
  return {
    type: "SET_SEMINAR_IN_SESSION",
    payload: seminar_access_code ,
  };
}
