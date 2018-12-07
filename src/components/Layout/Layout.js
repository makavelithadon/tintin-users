import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import Menu from "components/Menu";
import Header from "components/Header";
import { media } from "utils";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
  transition: ${props => props.theme.transitions.primary};
`;

const StyledContent = styled.section`
  position: relative;
`;

function Layout({ children, theme }) {
  const page = typeof children === "function" ? children() : children;
  return (
    <StyledMain>
      <Menu>
        <Menu.Nav />
        <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
          {matches => (matches ? <Menu.Sidebar /> : <Header />)}
        </Media>
      </Menu>
      <StyledContent>{page}</StyledContent>
    </StyledMain>
  );
}

export default withTheme(Layout);
