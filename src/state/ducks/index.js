import { combineReducers } from "redux";
import app from "./app";
import theme from "./theme";
import auth from "./auth";
import characters from "./characters";

const rootReducer = combineReducers({
  app,
  theme,
  auth,
  characters
});

export default rootReducer;
