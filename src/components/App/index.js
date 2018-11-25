import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function App({ children }) {
  const [app, setApp] = useState({
    menu: {
      from: "left"
    }
  });
  return (
    <AppContext.Provider
      value={{
        app,
        setApp
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
