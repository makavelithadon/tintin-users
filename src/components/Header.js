import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "components/App";
import Menu from "components/Menu/index";
import { media } from "utils";

const StyledHeader = styled.header`
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => media.forEach(theme.sizes.header.height, height => `height: ${height}`)};
`;

export default function Header() {
  const {
    app: { menu }
  } = useContext(AppContext);
  return <StyledHeader>{menu.from === "top" && <Menu.Burger />}</StyledHeader>;
}
