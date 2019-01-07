import React, { memo } from "react";
import styled, { withTheme } from "styled-components";
import { formatRoute } from "react-router-named-routes";
import { Keyframes, animated } from "react-spring";
import Menu from "./";
import { setDocumentElementStyles } from "./utils";
import data from "data";
import { AnimatedExit as Exit } from "UI/Icons";
import { easeSinOut, easeCubicInOut } from "d3-ease";
import { media } from "utils";
import NavLink from "components/NavLink";
import { CHARACTER_SLUG } from "routes";
import { fillSizes } from "style-utils";

const navSpringConfig = {
  common: { duration: 450 },
  enter: { easing: easeSinOut },
  leave: key => ({ delay: key === "o" ? 650 : 550, easing: easeSinOut })
};

const linksTrailConfigs = {
  common: { clamp: true, duration: 350, easing: easeCubicInOut },
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
      rotate: 0,
      y: 0,
      from: { o: 0, rotate: 1, y: 8 },
      config: key => {
        const conf = { ...linksTrailConfigs.common, ...linksTrailConfigs.enter };
        if (key === "rotate") conf.duration = 400;
        return conf;
      }
    }
  ],
  leave: [{ o: 0, rotate: 1, y: 8, config: { ...linksTrailConfigs.common, ...linksTrailConfigs.leave } }]
});

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

const StyledNavItem = styled(animated.li).attrs(({ o, rotate, y }) => ({
  style: {
    transform: rotate.interpolate(r => `rotate(${r}deg)`),
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
  text-transform: uppercase;
  transform-origin: -200px 50%;
  font-weight: 900;
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

const AnimatedLinksLetter = Keyframes.Trail({
  enter: [
    {
      o: 1,
      y: 0,
      from: { o: 0, y: 100 },
      config: key => ({
        clamp: true,
        duration: key === "o" ? 500 : 700,
        easing: easeSinOut,
        delay: 300
      })
    }
  ],
  leave: [{ o: 0, y: 100, config: { easing: easeSinOut, clamp: true, duration: 500 } }]
});

const StyledLinkLetter = styled(animated.span).attrs(({ o, y }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: y.interpolate(y => `translate3d(0, ${y}%, 0)`)
  }
}))`
  ${fillSizes()}
`;

function Nav({ theme, toggleTheme }) {
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
                <StyledExitIconContainer>
                  <Exit
                    onClick={() => toggle(false)}
                    animationState={animationState}
                    immediate={false}
                    color={theme.colors.background}
                  />
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
                        to={formatRoute(CHARACTER_SLUG, { character: item.slug })}
                        onClick={e => {
                          if (!isOpen) {
                            e.preventDefault();
                            return;
                          }
                          toggle(false);
                        }}
                      >
                        <AnimatedLinksLetter
                          items={item.displayName.split("").map((letter, index) => ({
                            letter: letter === " " ? <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }} /> : letter,
                            index
                          }))}
                          keys={item => `${item.letter}-${item.index}`}
                          state={animationState}
                          reverse={!isOpen}
                          native
                        >
                          {item => props => (
                            <span
                              style={{
                                display: "inline-block",
                                overflow: "hidden",
                                /* border: "1px solid black", */ position: "relative"
                              }}
                            >
                              <span style={{ opacity: 0 }}>{item.letter}</span>
                              <StyledLinkLetter {...props}>{item.letter}</StyledLinkLetter>
                            </span>
                          )}
                        </AnimatedLinksLetter>
                      </StyledNavLink>
                    </StyledNavItem>
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
