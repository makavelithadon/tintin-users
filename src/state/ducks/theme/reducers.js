import initialTheme from "theme";
import { TOGGLE_THEME, CHANGE_THEME } from "./types";

function toggleTheme(currentTheme) {
  const { colors, name } = currentTheme;
  return {
    ...initialTheme,
    name: name === "light" ? "black" : "light",
    colors: {
      ...initialTheme.colors,
      primary: colors.secondary,
      secondary: colors.primary,
      background: name === "light" ? colors.primary : colors.white,
      text: name === "light" ? colors.white : colors.darkGrey
    }
  };
}

export default function theme(state = initialTheme, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return action.payload;
    case TOGGLE_THEME:
      return toggleTheme(state);
    default:
      return state;
  }
}
