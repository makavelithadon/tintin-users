import auth from "auth";
import { call, takeLatest, put } from "redux-saga/effects";
import { loginSuccess } from "./../ducks/auth/actions";
import { INIT_TYPE } from "./../../constants";

function* initWorkerSaga() {
  if (auth.isLogged()) {
    yield put(loginSuccess({ data: auth.getDecodedToken().user }));
  }
}

export default function* initWatcherSaga() {
  yield takeLatest(INIT_TYPE, initWorkerSaga);
}
