const initState = {
  sessionIsSent: false,
  sessionIdReceived: false,
  sessionId: null,
  energyFetchInitiated: false,
  energyFetchFulfilled: false,
  error: null,
  calculationResult: null,
  session: {
    seminar_access_code: null,
    answers: [],
  },
};

export default function answerReducer(state = initState, action) {
  switch (action.type) {
    case "SELECT_ANSWER": {
      let possibleAnswerId = action.payload.possibleAnswerId;
      let variable = action.payload.variable;
      let modifiedAnswers = [];
      let answerIsEmpty = state.session.answers.length == 0;
      if (
        !answerIsEmpty &&
        variable != null &&
        state.session.answers.filter(
          (item) => item.possibleAnswer.id == possibleAnswerId
        ).length > 0
      ) {
        let wasModified = false;
        modifiedAnswers = state.session.answers.map((item) => {
          if (item.possibleAnswer.id == possibleAnswerId) {
            item.variableValues = item.variableValues.map((item2) => {
              if (item2.variable.id == variable.variable.id) {
                item2.value = variable.value;
                wasModified = true;
              }
              return item2;
            });
            if (!wasModified) {
              item.variableValues = [...item.variableValues, variable];
            }
          }
          return item;
        });
      } else if (
        !answerIsEmpty &&
        variable != null &&
        state.session.answers.filter(
          (item) => item.possibleAnswer.id == possibleAnswerId
        ).length == 0
      ) {
        modifiedAnswers = [
          ...state.session.answers,
          {
            possibleAnswer: {
              id: possibleAnswerId,
            },
            variableValues: [variable],
          },
        ];
      } else {
        modifiedAnswers = [
          ...state.session.answers,
          {
            possibleAnswer: {
              id: possibleAnswerId,
            },
            variableValues: [],
          },
        ];
      }
      return Object.assign({}, state, {
        session: {
          ...state.session,
          answers: modifiedAnswers,
        },
      });
    }
    case "UNSELECT_ANSWER": {
      let possibleAnswerId = action.payload.possibleAnswerId;
      let variableId = action.payload.variableId;
      let answers = state.session.answers.filter((item) => {
        if (item.possibleAnswer.id != possibleAnswerId) {
          return item;
        } else if (
          item.possibleAnswer.id == possibleAnswerId &&
          item.variableValues.length > 1 &&
          variableId != null
        ) {
          item.variableValues = item.variableValues.filter(
            (item) => item.variable.id != variableId
          );
          return item;
        }
      });

      return Object.assign({}, state, {
        session: {
          ...state.session,
          answers: answers,
        },
      });
    }

    case "SEND_SESSION_PENDING": {
      return Object.assign({}, state, {
        sessionIsSent: true,
        error: null,
      });
    }
    case "SEND_SESSION_REJECTED": {
      return Object.assign({}, state, {
        energyFetchInitiated: true,
        sessionIdReceived: true,
        error: action.payload,
      });
    }
    case "SEND_SESSION_FULFILLED": {
      return Object.assign({}, state, {
        sessionIdReceived: true,
        sessionId: action.payload.data,
        error: null,
      });
    }
    case "SET_SEMINAR_IN_SESSION": {
      return Object.assign({}, state, {
        session: {
          ...state.session,
          seminar_access_code: action.payload,
        },
    });
    }
    case "FETCH_RESULT_PENDING": {
      return initState;
    }
    case "FETCH_RESULT_REJECTED": {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case "FETCH_RESULT_FULFILLED": {
      return Object.assign({}, state, {
        sessionIdReceived: true,
        calculationResult: action.payload.data,
        error: null,
      });
    }

    case "COMPUTE_ENERGY_PENDING": {
      return Object.assign({}, state, {
        energyFetchInitiated: true,
        error: null,
      });
    }
    case "COMPUTE_ENERGY_REJECTED": {
      return Object.assign({}, state, {
        energyFetchInitiated: true,
        energyFetchFulfilled: true,
        error: action.payload,
      });
    }
    case "COMPUTE_ENERGY_FULFILLED": {
      return Object.assign({}, state, {
        energyFetchFulfilled: true,
        calculationResult: action.payload.data,
        error: null,
      });
    }
    case "RESTART_QUESTIONNAIRE": {
      return Object.assign({}, state, initState);
    }

    case "LOGOUT": {
      return initState;
    }
  }
  return state;
}
