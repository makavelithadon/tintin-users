const intialState = {
  version: "0.0.1"
};

export default function App(state = intialState, action) {
  switch (action.type) {
    case "INCREMENT_VERSION":
      const splitted = state.version.split(".");
      return { ...state, version: `0.0.${parseInt(splitted[splitted.length - 1]) + 1}` };
    case "UPDATE_VERSION":
      return { ...state, version: action.payload };
    default:
      return state;
  }
}
