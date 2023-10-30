import { applyMiddleware, createStore, compose } from "redux";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import reducer from "./reducer";
import { matchPath } from "react-router";

const changeLang = (store) => (next) => (action) => {
  if (action.type === "CHANGE_LANGUAGE") {
    next(action);
    const isCalculatorPathActive = !!matchPath(
      window.location.pathname,
      "/calculator"
    );
    if (isCalculatorPathActive) {
      next({
        type: "SAVE_QUESTION_INDEX",
        payload: {},
      });
      next(window.location.reload());
    }
  } else {
    return next(action);
  }
};

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(changeLang, promise(), createLogger())
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const persistor = persistStore(store);
