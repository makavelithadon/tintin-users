import { createSelector } from "reselect";

export const getCharacters = createSelector(
  [state => state.characters],
  c => c
);
