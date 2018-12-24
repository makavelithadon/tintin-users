import rootReducer from "state/ducks";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import auth from "auth";
import { LOGIN_SUCCESS } from "state/ducks/auth/types";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(sagas);

if (auth.isLogged()) {
  store.dispatch({ type: LOGIN_SUCCESS, payload: { data: auth.getDecodedToken().user } });
}

export default store;
