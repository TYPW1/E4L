import axios from "axios/index";

export function fetchQuestionnaire() {
  const url = "/questionnaire";

  return {
    type: "FETCH_QUESTIONNAIRE",
    payload: axios.get(url),
  };
}

export function nextPage() {
  return {
    type: "NEXT_PAGE",
    payload: {},
  };
}

export function showMaxThresholdErrorMessage(msg) {
  return {
    type: "SHOW_MAX_THRESHOLD_ERROR_MSG",
    payload: { msg },
  };
}
export function hideMaxThresholdErrorMessage() {
  return {
    type: "HIDE_MAX_THRESHOLD_ERROR_MSG",
    payload: {},
  };
}
export function previousPage() {
  return {
    type: "PREVIOUS_PAGE",
    payload: {},
  };
}

export function goToQuestion(question) {
  return {
    type: "GO_TO_QUESTION",
    payload: { question },
  };
}

export function saveQuestionIndex() {
  return {
    type: "SAVE_QUESTION_INDEX",
    payload: {},
  };
}

export function restartQuestionnaire() {
  return {
    type: "RESTART_QUESTIONNAIRE",
    payload: 0,
  };
}

export function fetchSessionCount() {
  const url = `/responses/count`;

  return {
    type: "FETCH_SESSION_COUNT",
    payload: axios.get(url),
  };
}

// export function computeEnergy(session) {
//   const url = "/calculate/energyConsumption";

//   return {
//     type: "COMPUTE_ENERGY",
//     payload: axios.post(url, session),
//   };
// }
