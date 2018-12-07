import React from "react";
import styled, { withTheme } from "styled-components";
import { Link } from "react-router-dom";
import { Spring, animated } from "react-spring";
import Burger from "./Burger";
import { media } from "utils";
import Media from "react-media";
import appLogo from "assets/img/logo.png";
import { easeCircleOut } from "d3-ease";

const sidebarSpringConfig = { duration: 300, easing: easeCircleOut, delay: 2000 };

const StyledLogo = styled.img`
  display: block;
  max-width: 60px;
  margin: 0 auto;
`;

const StyledSidebar = styled(animated.aside).attrs(({ o, x }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: x.interpolate(x => `translateX(${x}%)`)
  }
}))`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  ${({ theme }) => media.forEach(theme.styles.sidebar.width, h => `width: ${h};`)};
`;

const StyledEmailContainer = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  transform: rotate(-90deg);
`;

const StyledEmail = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  &:hover {
    text-decoration: underline;
  }
`;

function Sidebar({ theme }) {
  return (
    <Spring from={{ o: 0, x: -20 }} to={{ o: 1, x: 0 }} config={sidebarSpringConfig} native>
      {props => (
        <StyledSidebar {...props}>
          <Link to={"/"}>
            <StyledLogo src={appLogo} alt="Logo" />
          </Link>
          <Burger color={theme.colors.primary} />
          <Media query={`(min-height: ${theme.breakpoints.values.small})`}>
            {match => (
              <StyledEmailContainer>
                {match ? (
                  <StyledEmail href={"mailto:romuald.duconseil@hotmail.fr"}>romuald.duconseil@hotmail.fr</StyledEmail>
                ) : null}
              </StyledEmailContainer>
            )}
          </Media>
        </StyledSidebar>
      )}
    </Spring>
  );
}

export default withTheme(Sidebar);
