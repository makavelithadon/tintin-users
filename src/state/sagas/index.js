import { all } from "redux-saga/effects";
import charactersSagas from "./../ducks/characters/sagas";

const sagas = [charactersSagas];

export default function* rootSagas() {
  yield all(sagas.map(saga => saga()));
}
