import { combineReducers } from "redux";
import app from "./app";
import theme from "./theme";
import auth from "./auth";

const rootReducer = combineReducers({
  app,
  theme,
  auth
});

export default rootReducer;
