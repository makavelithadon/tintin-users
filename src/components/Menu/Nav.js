import React, { useContext, memo } from "react";
import styled, { withTheme } from "styled-components";
import { Keyframes, animated } from "react-spring";
import { AppContext } from "components/App";
import { MenuContext } from "./index";
import { setDocumentElementStyles } from "./utils";
import data from "data";
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
    pointerEvents: o.interpolate(o => (o >= 1 ? "auto" : "none")),
    transform: slide.interpolate(slide => `translate${from === "left" ? "X" : "Y"}(${slide}%)`)
  }
}))`
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
  overflow: hidden;
  max-height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => `padding ${theme.transitions.primary}`};
  top: 0;
  ${media.forEach(
    { xs: "20px 30px 20px 80px", small: "30px 30px 30px 120px", medium: "60px  60px 60px 150px" },
    p => `padding: ${p};`
  )};
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
  text-align: center;
  user-select: none;
  line-height: 1;
  ${media.forEach({ xs: 3.5, small: 4, medium: 4.5, large: 5.5 }, fZ => `font-size: ${fZ}rem;`)};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const StyledNavLink = styled(NavLink)`
  color: inherit;
`;

function Nav({ theme }) {
  const { isOpen, toggle } = useContext(MenuContext);
  const {
    app: { menu }
  } = useContext(AppContext);
  const animationsState = isOpen ? "enter" : "leave";
  setDocumentElementStyles(isOpen);
  return (
    <AnimatedNav state={animationsState} native>
      {props => (
        <StyledNav {...props} theme={theme} from={menu.from}>
          <AnimatedLinks items={data.users} keys={item => item.id} state={animationsState} reverse={!isOpen} native>
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
}

export default withTheme(memo(Nav));
