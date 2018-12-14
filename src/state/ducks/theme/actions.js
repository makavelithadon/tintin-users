import { TOGGLE_THEME, CHANGE_THEME } from "./types";

export const changeTheme = payload => ({
  type: CHANGE_THEME,
  payload
});

export const toggleTheme = () => ({
  type: TOGGLE_THEME
});
