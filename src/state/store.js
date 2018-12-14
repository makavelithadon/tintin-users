import React, { createContext, useReducer } from "react";
import rootReducer from "state/ducks";
export const StoreContext = createContext();

export default function Store({ rootReducer, initialStore, ...rest }) {
  const state = useReducer(rootReducer, initialStore, { type: "__INIT__" });
  return <StoreContext.Provider {...rest} value={state} />;
}

Store.defaultProps = {
  rootReducer
};
