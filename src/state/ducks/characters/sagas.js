import { takeLatest, call, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { FETCH_CHARACTERS, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_ERROR } from "./types";
import { fetchCharactersSuccess, fetchCharactersError } from "./actions";
import data from "data";

async function fetchCharacters(params) {
  return await data;
}

function* charactersWorkerSaga() {
  try {
    const { users } = yield call(fetchCharacters);
    yield put(fetchCharactersSuccess({ items: users }));
  } catch (err) {
    yield put(fetchCharactersError({ error: err }));
  }
}

export default function* charactersWatcherSaga() {
  yield takeLatest(FETCH_CHARACTERS, charactersWorkerSaga);
}
