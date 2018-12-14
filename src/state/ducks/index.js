import { combineReducers } from "redux";
import app from "./app";
import theme from "./theme";

const rootReducer = combineReducers({
  app,
  theme
});

export default rootReducer;
