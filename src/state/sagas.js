import { all, fork } from "redux-saga/effects";
import authSagas from "./ducks/auth/sagas";

export default function* rootSagas() {
  yield all([fork(authSagas)]);
}
