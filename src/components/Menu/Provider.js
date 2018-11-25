import React from "react";
import { MenuContext, useMenu } from "./index";

export default function Provider({ children }) {
  return <MenuContext.Provider value={useMenu()}>{children}</MenuContext.Provider>;
}
