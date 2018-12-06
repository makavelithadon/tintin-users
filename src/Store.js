import React, { createContext, useReducer } from "react";

export const StoreContext = createContext();

export default function Store({ rootReducer, initialStore, ...rest }) {
  const state = useReducer(rootReducer, initialStore, { type: "__INIT__" });
  return <StoreContext.Provider {...rest} value={state} />;
}
