import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import questionnaireReducer from "./questionnaireReducer";
import answerReducer from "./answerReducer";
import navReducer from "./navReducer";
import { seminarReducer } from "./seminarReducer"
import { userReducer } from "./userReducer";
import contactReducer from "./contactReducer";
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

export default persistReducer(
  persistConfig,
  combineReducers({
    answerReducer,
    questionnaireReducer,
    navReducer,
    userReducer,
    seminarReducer,
    contactReducer
  })
);
