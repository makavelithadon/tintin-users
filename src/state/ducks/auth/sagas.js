import { takeLatest, call, put } from "redux-saga/effects";
import { LOGIN, LOGOUT } from "./types";
import { loginSuccess, loginError } from "./actions";
import auth from "auth";
import api from "api";

async function postAuth(params) {
  return await api.login(params);
}

function* loginWorker(action) {
  try {
    const res = yield call(postAuth, action.payload);
    const { token } = res.data;
    const { user } = auth.decode(token);
    auth.login(token);
    yield put(loginSuccess({ data: user }));
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
}
