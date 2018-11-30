import React, { createContext, useState } from "react";
import data from "data";

export const AppContext = createContext();

export default function App({ children }) {
  const [app, setApp] = useState({
    users: data.users,
    selected: null,
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
