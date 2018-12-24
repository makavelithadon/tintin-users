import { all, fork } from "redux-saga/effects";
import authSagas from "./../ducks/auth/sagas";
import initSagas from "./init";

export default function* rootSagas() {
  yield all([fork(initSagas), fork(authSagas)]);
}
