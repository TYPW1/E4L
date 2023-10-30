const initState = {
  canGoNext: false,
  currentQuestion: 0,
  altCurrentQuestion: 0,
  totalNbQuestion: 0,
  sessionCount: 0,
  fetched: false,
  fetching: false,
  showMaxThreshErrorMsg: false,
  maxThreshErrorMsg: "The value can't be greater than 10!",
  error: null,
  // calculationResult: null,
  questionnaire: {
    questions: [],
  },
};

export default function questionnaireReducer(state = initState, action) {
  switch (action.type) {
    case "FETCH_QUESTIONNAIRE_PENDING": {
      return Object.assign({}, state, {
        error: null,
        fetched: false,
        fetching: true,
        questionnaire: {
          questions: [],
        },
      });
    }
    case "FETCH_QUESTIONNAIRE_REJECTED": {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
        error: action.payload,
      });
    }
    case "FETCH_QUESTIONNAIRE_FULFILLED": {
      let newCurrentQuestion = 0;
      if (window.localStorage.getItem("currentPage") != null) {
        newCurrentQuestion = parseInt(
          window.localStorage.getItem("currentPage"),
          10
        );
      } else {
        newCurrentQuestion = 0;
      }
      // window.localStorage.setItem("currentPage", null);
      return Object.assign({}, state, {
        fetched: true,
        fetching: false,
        currentQuestion: newCurrentQuestion,
        error: null,
        questionnaire: {
          questions: action.payload.data,
        },
      });
    }
    case "SHOW_MAX_THRESHOLD_ERROR_MSG":{
        let p = action.payload;
        return Object.assign({}, state, {
          showMaxThreshErrorMsg: true,
          maxThreshErrorMsg: p.msg,
        });
     }
    case "HIDE_MAX_THRESHOLD_ERROR_MSG":{
        return Object.assign({}, state, {
                  showMaxThreshErrorMsg: false,
        });
    }
    case "NEXT_PAGE": {
      let currentQuestion = state.currentQuestion;
      let totalNbQuestion = state.questionnaire.questions.length;
      if (currentQuestion < totalNbQuestion - 1) {
        window.localStorage.setItem("currentPage", currentQuestion + 1);
        return Object.assign({}, state, {
          canGoNext: false,
          currentQuestion: currentQuestion + 1,
        });
      } else {
        return state;
      }
    }
    case "PREVIOUS_PAGE": {
      let currentQuestion = state.currentQuestion;
      let totalNbQuestion = state.questionnaire.questions.length;
      if (currentQuestion > 0) {
        window.localStorage.setItem("currentPage", currentQuestion - 1);
        return Object.assign({}, state, {
          currentQuestion: currentQuestion - 1,
        });
      } else {
        return state;
      }
    }
    case "GO_TO_QUESTION": {
      let goToQuestion = action.payload;
      return Object.assign({}, state, {
        currentQuestion: goToQuestion.question,
      });
    }

    case "SAVE_QUESTION_INDEX": {
      window.localStorage.setItem("currentPage", state.currentQuestion);
      return state;
    }

    case "RESTART_QUESTIONNAIRE": {
      window.localStorage.setItem("currentPage", 0);
      return Object.assign({}, state, initState);
    }

    case "FETCH_SESSION_COUNT_PENDING": {
      return state;
    }
    case "FETCH_SESSION_COUNt_REJECTED": {
      return state;
    }
    case "FETCH_SESSION_COUNT_FULFILLED": {
      return Object.assign({}, state, {
        sessionCount: action.payload.data,
      });
    }

    // case "COMPUTE_ENERGY_PENDING": {
    //   return initState;
    // }
    // case "COMPUTE_ENERGY_REJECTED": {
    //   return Object.assign({}, state, {
    //     error: action.payload,
    //   });
    // }
    // case "COMPUTE_ENERGY_FULFILLED": {
    //   return Object.assign({}, state, {
    //     calculationResult: action.payload.data,
    //     error: null,
    //   });
    // }
  }
  return state;
}
