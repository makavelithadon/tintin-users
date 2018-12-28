import React from "react";
import styled, { withTheme } from "styled-components";
import { Link } from "react-router-dom";
import { Spring, animated } from "react-spring";
import Burger from "./Burger";
import { media } from "utils";
import Media from "react-media";
import appLogo from "assets/img/logo.png";
import { easeSinOut } from "d3-ease";

const sidebarSpringConfig = { duration: 300, easing: easeSinOut, delay: 1500 };

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
  padding: ${({ theme }) => `30px 0 ${theme.styles.sidebar.paddingBottom} 0;`};
  ${({ theme }) => media.forEach(theme.styles.sidebar.width, h => `width: ${h};`)};
`;

const StyledBurgerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const emailHeight = "20px";

const StyledEmailContainer = styled.div`
  position: absolute;
  bottom: 30px;
  height: ${emailHeight};
  left: 50%;
  display: flex;
  align-items: center;
  transform: translate(-50%, ${parseInt(emailHeight, 10) / 2}px) rotate(-90deg);
`;

const StyledEmailWrapper = styled.div`
  width: 225px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
`;

const StyledEmail = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.secondary};
  &:hover {
    text-decoration: underline;
  }
`;

const StyledEmailWithColor = styled.span.attrs(({ color }) => ({
  className: `is-${color}`
}))`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 100%;
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.primary)};
  text-decoration: inherit;
  z-index: ${({ zIndex }) => zIndex};
  transform: ${({ color }) => (color !== "primary" ? `translateX(100%)` : "none")};
`;

function Sidebar({ theme }) {
  return (
    <Spring from={{ o: 0, x: -20 }} to={{ o: 1, x: 0 }} config={sidebarSpringConfig} native>
      {props => (
        <StyledSidebar {...props}>
          <Link to={"/"}>
            <StyledLogo src={appLogo} alt="Logo" />
          </Link>
          <StyledBurgerContainer>
            <Burger color={"primary"} />
          </StyledBurgerContainer>
          <Media query={`(min-height: ${theme.breakpoints.values.small})`}>
            {match =>
              match ? (
                <StyledEmailContainer>
                  <StyledEmailWrapper>
                    <StyledEmail href={"mailto:romuald.duconseil@hotmail.fr"}>
                      <StyledEmailWithColor color={"primary"} zIndex={2}>
                        romuald.duconseil@hotmail.fr
                      </StyledEmailWithColor>
                      <StyledEmailWithColor color={"secondary"} zIndex={1}>
                        romuald.duconseil@hotmail.fr
                      </StyledEmailWithColor>
                    </StyledEmail>
                  </StyledEmailWrapper>
                </StyledEmailContainer>
              ) : null
            }
          </Media>
        </StyledSidebar>
      )}
    </Spring>
  );
}

export default withTheme(Sidebar);
