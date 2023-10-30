const initState = {
  isNavButtonsDisabled: "false",
  isLogoutButtonDisabled: "true",
};

export default function navReducer(state = initState, action) {
  switch (action.type) {
    case "HIDE_NAV_BUTTONS": {
      return Object.assign({}, state, {
        isNavButtonsDisabled: "true",
      });
    }
    case "SHOW_NAV_BUTTONS": {
      return Object.assign({}, state, {
        isNavButtonsDisabled: "false",
        isLogoutButtonDisabled: "true"
      });
    }
    case "HIDE_LOGOUT_BUTTONS": {
      return Object.assign({}, state, {
        isNavButtonsDisabled: "false",
        isLogoutButtonDisabled: "true",
      });
    }
    case "SHOW_LOGOUT_BUTTONS": {
      return Object.assign({}, state, {
        isNavButtonsDisabled: "true",
        isLogoutButtonDisabled: "false",
      });
    }
  }
  return state;
}
