import React, { memo, useEffect } from "react";
import styled, { withTheme } from "styled-components";
import { animated } from "react-spring";
import Menu from "./..";
import { setDocumentElementStyles } from "./../utils";
import { media } from "utils";
import { AnimatedNav } from "./animationConfigs";
import ListItems from "./NavItems/List";
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

function Nav({ theme, characters, fetchCharacters }) {
  useEffect(() => {
    if (!characters.items.length) fetchCharacters();
  });
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
                <ListItems
                  list={characters.items}
                  isNavOpen={isOpen}
                  animationState={animationState}
                  onClick={e => {
                    if (!isOpen) {
                      e.preventDefault();
                      return;
                    }
                    toggle(false);
                  }}
                />
              </StyledNav>
            )}
          </AnimatedNav>
        );
      }}
    </Menu.Consumer>
  );
}

export default withTheme(memo(Nav));
