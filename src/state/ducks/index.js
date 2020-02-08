import { combineReducers } from "redux";
import app from "./app";
import theme from "./theme";
import characters from "./characters";

const rootReducer = combineReducers({
  app,
  theme,
  characters
});

export default rootReducer;
