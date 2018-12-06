import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import Menu from "components/Menu/index";
import Header from "./Header";
import { media } from "utils";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
  transition: ${props => props.theme.transitions.primary};
`;

const StyledContent = styled.section`
  position: relative;
  display: flex;
  margin: 0 auto;
  ${media.forEach({ xs: "100%", medium: "90%", large: "80%" }, w => `width: ${w};`)};
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 15vh;
  ${media.forEach({ xs: "30px", small: "50px", medium: "80px" }, paddingRight => `padding-right: ${paddingRight};`)};
  ${({ theme }) => {
    const { xs, ...otherSizes } = theme.styles.sidebar.width;
    return media.forEach(
      {
        xs: "30px",
        ...Object.entries(otherSizes).reduce(
          (styles, [breakpoint, paddingLeft]) => ({
            ...styles,
            [breakpoint]: breakpoint === "small" ? `${parseInt(paddingLeft, 10) + 30}px` : paddingLeft
          }),
          {}
        )
      },
      p => `padding-left: ${p};`
    );
  }};
  padding-bottom: 35vh;
  height: 100%;
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
