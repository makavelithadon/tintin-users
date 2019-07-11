import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "components/App";

const StyledToggle = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  border: none;
  outline: 0;
  outline-offset: 0;
  border-radius: 4px;
  z-index: 100;
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkGrey};
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
`;

export default function ToggleMenuPosition({ children }) {
  const { app, setApp } = useContext(AppContext);
  const updateMenuPosition = () => setApp({ menu: { from: app.menu.from === "left" ? "top" : "left" } });
  return <StyledToggle onClick={updateMenuPosition}>{children}</StyledToggle>;
}
