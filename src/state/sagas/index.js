import { all, fork } from "redux-saga/effects";
import authSagas from "./../ducks/auth/sagas";

const sagas = [authSagas];

export default function* rootSagas() {
  yield all(sagas.map(saga => saga()));
}
