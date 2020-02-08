import { combineReducers } from "redux";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SHOW_LOGIN_DIALOG
} from "./types";

const initialData = null;

const data = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.data;
    case LOGIN_ERROR:
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

const initialIsLoading = false;

const isLoading = (state = initialIsLoading, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:
      return false;
    default:
      return state;
  }
};

const initialError = null;

const error = (state = initialError, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return null;
    case LOGIN_ERROR:
      return action.payload.error;
    default:
      return state;
  }
};

const initialShowLoginDialog = false;

const showLoginDialog = (state = initialShowLoginDialog, action) => {
  switch (action.type) {
    case SHOW_LOGIN_DIALOG:
      return !!action.payload.show;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  isLoading,
  error,
  showLoginDialog
});
