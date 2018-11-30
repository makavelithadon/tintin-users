import React, { useContext, memo } from "react";
import styled, { withTheme } from "styled-components";
import { Keyframes, animated } from "react-spring";
import Media from "react-media";
import { AppContext } from "components/App";
import Menu from "./index";
import { setDocumentElementStyles } from "./utils";
import data from "data";
import { AnimatedExit as Exit } from "UI/Icons";
import {
  //easeLinear,
  easePolyIn,
  easePolyOut,
  /*easePolyInOut,
  easeCubicIn,
  easeCubicOut,
  easeCubicInOut,
  expInOut,
  easeQuadIn,
  easeQuadOut,
  easeQuadInOut,
  easeExpIn,*/
  easeExpOut
  /*easeExpInOut,
  easeCircleInOut,
  easeCircleOut,
  easeBackIn,
  easeBackOut,
  easeBackInOut,
  easeBounceInOut,
  ease*/
} from "d3-ease";
import { media } from "utils";
import NavLink from "components/NavLink";

const navSpringConfig = {
  common: { duration: 400 },
  enter: { easing: easePolyIn },
  leave: key => ({ delay: key === "o" ? 650 : 550, easing: easePolyOut })
};

const linksTrailConfigs = {
  common: { clamp: true, duration: 350, easing: easeExpOut },
  enter: { delay: 650 },
  leave: { delay: 150 }
};

const AnimatedNav = Keyframes.Spring({
  enter: [
    {
      o: 1,
      slide: 0,
      from: { o: 0, slide: -100 },
      config: { ...navSpringConfig.common, ...navSpringConfig.enter }
    }
  ],
  leave: [{ o: 0, slide: -100, config: key => ({ ...navSpringConfig.common, ...navSpringConfig.leave(key) }) }]
});

const AnimatedLinks = Keyframes.Trail({
  enter: [
    {
      o: 1,
      slide: 0,
      from: { o: 0, slide: 36 },
      config: { ...linksTrailConfigs.common, ...linksTrailConfigs.enter }
    }
  ],
  leave: [{ o: 0, slide: 36, config: { ...linksTrailConfigs.common, ...linksTrailConfigs.leave } }]
});

const StyledNav = styled(animated.nav).attrs(({ o, slide, from }) => ({
  style: {
    /* opacity: o.interpolate(o => o), */
    display: o.interpolate(o => (o > 0 ? "flex" : "none")),
    visibility: o.interpolate(o => (o > 0 ? "visible" : "hidden")),
    /* pointerEvents: o.interpolate(o => (o >= 1 ? "auto" : "none")), */
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
  background: ${({ theme }) => theme.colors.primary};
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

const StyledNavLinksContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
`;

const StyledNavItem = styled(animated.li).attrs(({ o, slide }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: slide.interpolate(slide => `translateY(${slide}px)`),
    visibility: o.interpolate(o => (o > 0 ? "visible" : "hidden")),
    pointerEvents: o.interpolate(o => (o >= 1 ? "auto" : "none"))
  }
}))`
  position: relative;
  text-align: left;
  user-select: none;
  line-height: 1;
  ${media.forEach({ xs: 3.5, small: 4, medium: 4.5, large: 5.5 }, fZ => `font-size: ${fZ}rem;`)};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const StyledNavLink = styled(NavLink)`
  color: inherit;
`;

const StyledExitIconContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  ${({ theme }) => media.xs`
    top: ${parseInt(theme.styles.header.height.xs, 10) / 2}px;
    right: 12px;
  `}
  ${({ theme }) => {
    const sizes = { ...theme.styles.sidebar.width };
    delete sizes.xs;
    return media.forEach(sizes, h => `left: ${parseInt(h, 10) / 2}px; top: 50%; right: auto;`);
  }};
`;

function Nav({ theme }) {
  const {
    app: { menu }
  } = useContext(AppContext);
  return (
    <Menu.Consumer>
      {({ isOpen, toggle }) => {
        const animationState = isOpen ? "enter" : "leave";
        setDocumentElementStyles(isOpen);
        return (
          <AnimatedNav state={animationState} native>
            {props => (
              <StyledNav {...props} theme={theme} from={menu.from}>
                <StyledExitIconContainer>
                  <Exit onClick={() => toggle(false)} animationState={animationState} />
                </StyledExitIconContainer>
                <AnimatedLinks
                  items={data.users}
                  keys={item => item.id}
                  state={animationState}
                  reverse={!isOpen}
                  native
                >
                  {item => props => (
                    <StyledNavItem {...props}>
                      <StyledNavLink
                        to={`/${item.slug}`}
                        onClick={e => {
                          if (!isOpen) {
                            e.preventDefault();
                            return;
                          }
                          toggle(false);
                        }}
                      >
                        {item.displayName}
                      </StyledNavLink>
                    </StyledNavItem>
                  )}
                </AnimatedLinks>
              </StyledNav>
            )}
          </AnimatedNav>
        );
      }}
    </Menu.Consumer>
  );
}

export default withTheme(memo(Nav));
