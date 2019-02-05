import rootReducer from "state/ducks";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import { isDev, keepOnlyNotUndefinedValues } from "utils";

// create the saga middleware

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(
    rootReducer,
    compose(...keepOnlyNotUndefinedValues([applyMiddleware(sagaMiddleware), reduxDevTools]))
  );

  sagaMiddleware.run(sagas);

  if (isDev) {
    if (module.hot) {
      module.hot.accept("./ducks", () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
