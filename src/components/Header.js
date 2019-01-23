import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import Menu from "components/Menu";
import { media } from "utils";

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.background};
  ${({ theme }) => media.forEach(theme.styles.header.height, height => `height: ${height}`)};
  ${({ theme }) => media.forEach({ xs: theme.shadows.box, small: "none" }, bs => `box-shadow: ${bs};`)};
`;

function Header({ theme }) {
  return (
    <StyledHeader>
      <Media query={`min-with: (${theme.breakpoints.values.small})`}>
        {matches => (matches ? null : <Menu.Burger color={"text"} />)}
      </Media>
    </StyledHeader>
  );
}

export default withTheme(Header);
