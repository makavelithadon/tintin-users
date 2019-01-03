import { takeLatest, take, fork, call, all, put } from "redux-saga/effects";
import { LOGIN, LOGOUT } from "./types";
import { loginSuccess, loginError, showLoginDialog } from "./actions";
import { INIT_TYPE } from "./../../../constants";
import auth from "auth";
import api from "api";

async function postAuth(params) {
  return await api.login(params);
}

function* initWorkerSaga() {
  if (auth.isLogged()) {
    const { user } = auth.getDecodedToken();
    yield put(loginSuccess({ data: user }));
  }
}

function* loginWorker(action) {
  try {
    const res = yield call(postAuth, action.payload);
    const { token } = res.data;
    const { user } = auth.decode(token);
    auth.login(token);
    yield put(loginSuccess({ data: user }));
    yield put(showLoginDialog(true));
  } catch (error) {
    yield put(loginError({ error: error.response }));
  }
}

function* logoutWorker() {
  auth.logout();
}

export default function* authWatcherSaga() {
  yield takeLatest(LOGIN, loginWorker);
  yield takeLatest(LOGOUT, logoutWorker);
  yield take(INIT_TYPE);
  yield call(initWorkerSaga);
}
