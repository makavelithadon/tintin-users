import initialTheme from "theme";

function toggleTheme(theme) {
  return {
    ...theme
  };
}

export default function theme(state = initialTheme, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return toggleTheme(state);
    default:
      return state;
  }
}
