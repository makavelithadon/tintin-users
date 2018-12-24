import rootReducer from "state/ducks";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import auth from "auth";
import { LOGIN_SUCCESS } from "state/ducks/auth/types";
import { keepOnlyNotUndefinedValues } from "utils";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    ...keepOnlyNotUndefinedValues([
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ])
  )
);

sagaMiddleware.run(sagas);

export default store;
