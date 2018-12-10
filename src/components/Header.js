import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import Menu from "components/Menu/index";
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
`;

function Header({ theme }) {
  return (
    <StyledHeader>
      <Media query={`min-with: (${theme.breakpoints.values.small})`}>
        {matches => (matches ? null : <Menu.Burger color={theme.colors.primary} />)}
      </Media>
    </StyledHeader>
  );
}

export default withTheme(Header);
