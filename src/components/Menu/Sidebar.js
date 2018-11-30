import React, { useContext } from "react";
import styled, { withTheme } from "styled-components";
import { Link } from "react-router-dom";
import { Spring, animated } from "react-spring";
import Burger from "./Burger";
import { AppContext } from "components/App";
import { media } from "utils";
import appLogo from "assets/img/logo.png";
import {
  /* easeLinear,
  easePolyIn,
  easePolyOut,
  easePolyInOut,
  easeCubicIn,
  easeCubicOut,
  easeCubicInOut,
  expInOut,
  easeQuadIn,
  easeQuadOut,
  easeQuadInOut,
  easeExpIn,
  easeExpOut,
  easeExpInOut,
  easeCircleInOut, */
  easeCircleOut
  /* easeBackIn,
  easeBackOut,
  easeBackInOut,
  easeBounceInOut */
} from "d3-ease";

const sidebarSpringConfig = { duration: 300, easing: easeCircleOut, delay: 2000 };

const StyledLogo = styled.img`
  display: block;
  max-width: 60%;
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

const StyledBurger = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledEmailAddress = styled.a`
  writing-mode: tb;
  transform: rotate(-180deg);
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  &:hover {
    text-decoration: underline;
  }
`;

function Sidebar({ theme }) {
  const { selected } = useContext(AppContext);
  const normalizedSelectedUser = selected === null ? selected : selected < 10 ? `0${selected}` : selected;
  return (
    <Spring from={{ o: 0, x: -20 }} to={{ o: 1, x: 0 }} config={sidebarSpringConfig} native>
      {props => (
        <StyledSidebar {...props}>
          <Link to={"/"}>
            <StyledLogo src={appLogo} alt="Logo" />
          </Link>
          <StyledBurger>
            <Burger color={theme.colors.primary} />
          </StyledBurger>
          <div>
            {/* normalizedSelectedUser */}
            <StyledEmailAddress href={"mailto:romuald.duconseil@hotmail.fr"}>
              romuald.duconseil@hotmail.fr
            </StyledEmailAddress>
          </div>
        </StyledSidebar>
      )}
    </Spring>
  );
}

export default withTheme(Sidebar);
