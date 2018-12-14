import { combineReducers } from "redux";
import { INCREMENT_VERSION, UPDATE_VERSION } from "./types";

const initialVersion = "0.0.1";

function version(state = initialVersion, action) {
  switch (action.type) {
    case INCREMENT_VERSION:
      const splitted = state.version.split(".");
      return `0.0.${parseInt(splitted[splitted.length - 1]) + 1}`;
    case UPDATE_VERSION:
      return action;
    default:
      return state;
  }
}

export default combineReducers({
  version
});
