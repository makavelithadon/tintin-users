import { createSelector } from "reselect";

const getAll = state => state.characters;

const getItems = state => getAll(state).items;

const getSelected = (state, pathname) => getItems(state).filter(character => pathname.includes(character.slug))[0];

export const getCharacters = createSelector(
  [getAll],
  characters => characters
);

export const getSelectedCharacter = createSelector(
  [getSelected],
  character => character
);
