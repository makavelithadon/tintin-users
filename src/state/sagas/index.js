import { all } from "redux-saga/effects";
import authSagas from "./../ducks/auth/sagas";
import charactersSagas from "./../ducks/characters/sagas";

const sagas = [authSagas, charactersSagas];

export default function* rootSagas() {
  yield all(sagas.map(saga => saga()));
}
