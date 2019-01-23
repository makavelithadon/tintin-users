import { combineReducers } from "redux";
import { FETCH_CHARACTERS, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_ERROR } from "./types";
import data from "data";

const initialItems = data.characters;

const items = (state = initialItems, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_SUCCESS:
      return action.payload.items;
    default:
      return state;
  }
};

const initialIsLoading = false;

const isLoading = (state = initialIsLoading, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS:
      return true;
    case FETCH_CHARACTERS_SUCCESS:
    case FETCH_CHARACTERS_ERROR:
      return false;
    default:
      return state;
  }
};

const initialError = null;

const error = (state = initialError, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_SUCCESS:
      return null;
    case FETCH_CHARACTERS_ERROR:
      return action.payload.error;
    default:
      return state;
  }
};

export default combineReducers({
  items,
  isLoading,
  error
});
