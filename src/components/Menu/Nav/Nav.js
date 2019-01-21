import React, { memo } from "react";
import styled, { withTheme } from "styled-components";
import { formatRoute } from "react-router-named-routes";
import { animated } from "react-spring";
import Menu from "./../index";
import { setDocumentElementStyles } from "./../utils";
import data from "data";
import { media } from "utils";
import { AnimatedNav, AnimatedLinks } from "./animationConfigs";
import { CHARACTER_SLUG } from "routes";
import NavItem from "./NavItem";
import NavLink from "./NavLink";
import RotatedSlidedUpText from "components/Animations/Text/RotatedSlidedUp";
import NavExitIcon from "./NavExitIcon";

const StyledNav = styled(animated.nav).attrs(({ o, slide, from }) => ({
  style: {
    display: o.interpolate(o => (o > 0 ? "flex" : "none")),
    visibility: o.interpolate(o => (o > 0 ? "visible" : "hidden")),
    transform: slide.interpolate(slide => `translate${from === "left" ? "X" : "Y"}(${slide}%)`)
  }
}))`
  position: fixed;
  z-index: 20;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
  overflow: hidden;
  height: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.secondary};
  transition: ${({ theme }) => `padding ${theme.transitions.primary}`};
  top: 0;
  ${({ theme }) => {
    const selfPaddings = { xs: "20px 30px 20px", small: "30px 30px 30px", medium: "60px 60px 60px" };
    const { width: sidebarWidth } = theme.styles.sidebar;
    return media.forEach(
      Object.entries(selfPaddings).reduce(
        (acc, [breakpoint, value]) => ({
          ...acc,
          [breakpoint]: `${value} ${parseInt(sidebarWidth[breakpoint], 10) !== 0 ? sidebarWidth[breakpoint] : "30px"}`
        }),
        {}
      ),
      p => `padding: ${p};`
    );
  }};
  ${media.large`padding: 60px 60px 60px 220px;`};
`;

function Nav({ theme }) {
  return (
    <Menu.Consumer>
      {({ isOpen, toggle }) => {
        const animationState = isOpen ? "enter" : "leave";
        isOpen && setDocumentElementStyles(isOpen);
        return (
          <AnimatedNav
            state={animationState}
            native
            onRest={({ o }) => o === 0 && !isOpen && setDocumentElementStyles(false)}
          >
            {props => (
              <StyledNav {...props} theme={theme} from={"left"}>
                <NavExitIcon onClick={() => toggle(false)} animationState={animationState} />
                <AnimatedLinks
                  items={data.users}
                  keys={item => item.id}
                  state={animationState}
                  reverse={!isOpen}
                  native
                >
                  {item => props => (
                    <NavItem {...props}>
                      <NavLink
                        to={formatRoute(CHARACTER_SLUG, { character: item.slug })}
                        onClick={e => {
                          if (!isOpen) {
                            e.preventDefault();
                            return;
                          }
                          toggle(false);
                        }}
                      >
                        <RotatedSlidedUpText
                          text={item.displayName}
                          animationState={animationState}
                          reverse={!isOpen}
                          native
                        />
                      </NavLink>
                    </NavItem>
                  )}
                </AnimatedLinks>
                {/* <button onClick={toggleTheme}>Toggle theme</button> */}
              </StyledNav>
            )}
          </AnimatedNav>
        );
      }}
    </Menu.Consumer>
  );
}

export default withTheme(memo(Nav));
