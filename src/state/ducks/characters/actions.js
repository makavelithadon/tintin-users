import { FETCH_CHARACTERS, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_ERROR } from "./types";

export const fetchCharacters = () => ({ type: FETCH_CHARACTERS });

export const fetchCharactersSuccess = payload => ({ type: FETCH_CHARACTERS_SUCCESS, payload });

export const fetchCharactersError = payload => ({ type: FETCH_CHARACTERS_ERROR, payload });
