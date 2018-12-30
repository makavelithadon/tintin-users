import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import Markdown from "components/Markdown/Markdown";
import { Spring, Transition, Trail, animated } from "react-spring";
import { easeSinOut } from "d3-ease";
import data from "data/index";
import ScrolledPictures from "components/ScrolledPictures";
import Slider from "components/Slider/Slider";
import Description from "components/Description";
import * as Heading from "UI/Heading";
import { media } from "utils";
import { CHARACTER } from "routes";
import { useViewport } from "hooks";

const StyledUserContainer = styled.div`
  display: flex;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 15vh;
  min-height: 100vh;
  ${media.forEach({ xs: "100%", medium: "90%", large: "80%" }, w => `width: ${w};`)};
  ${media.forEach({ xs: "30px", small: "50px", medium: "80px" }, paddingRight => `padding-right: ${paddingRight};`)};
  ${({ theme }) => {
    const { xs, ...otherSizes } = theme.styles.sidebar.width;
    return media.forEach(
      {
        xs: "30px",
        ...Object.entries(otherSizes).reduce(
          (styles, [breakpoint, paddingLeft]) => ({
            ...styles,
            [breakpoint]:
              breakpoint === "small"
                ? `${parseInt(paddingLeft, 10) + 30}px`
                : breakpoint === "medium"
                ? `${parseInt(paddingLeft, 10) / 2}px`
                : paddingLeft
          }),
          {}
        )
      },
      p => `padding-left: ${p};`
    );
  }};
  padding-bottom: 20vh;
`;

const StyledAnimatedCharacterDisplayName = styled(animated.h1).attrs(({ o, r }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: r.interpolate(r => `rotate(${r}deg)`)
  }
}))`
  position: absolute;
  top: 0;
  margin: 0;
  margin-top: 0;
  line-height: 1;
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "initial")};
  ${media.forEach({ xs: "4rem", small: "7rem" }, fZ => `font-size: ${fZ};`)};
`;

const StyledLinkLetter = styled(animated.span).attrs(({ o, y }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: y.interpolate(y => `translate3d(0, ${y}px, 0)`)
  }
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const CharacterDisplayName = withRouter(({ style, name: nameFromParent }) => {
  const [name] = useState(nameFromParent);
  return (
    <StyledAnimatedCharacterDisplayName
      {...style}
      uppercase
      color={"primary"}
      style={{ width: "100%", height: "100%" }}
    >
      <Trail
        items={name.split("").map((letter, index) => ({
          letter: letter === " " ? <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }} /> : letter,
          index
        }))}
        keys={item => `${item.letter}-${item.index}`}
        from={{ o: 0, y: 60 }}
        to={{ o: 1, y: 0 }}
        config={key => ({
          clamp: true,
          duration: 500,
          easing: easeSinOut
        })}
        native
      >
        {item => props => (
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <span style={{ opacity: 0 }}>{item.letter}</span>
            <StyledLinkLetter {...props}>{item.letter}</StyledLinkLetter>
          </span>
        )}
      </Trail>
    </StyledAnimatedCharacterDisplayName>
    /* <StyledAnimatedCharacterDisplayName {...style} uppercase color={"primary"}>
      {name}
    </StyledAnimatedCharacterDisplayName> */
  );
});

function User({ theme, location }) {
  const [height, setHeight] = useState(0);
  const { width: windowWidth, height: windowHeight } = useViewport();
  const user = data.users.find(user => location.pathname.includes(user.slug));
  const ref = useRef(null);
  useEffect(
    () => {
      console.log("useEffect");
      setHeight(ref.current.clientHeight);
    },
    [location.pathname, windowWidth, windowHeight]
  );
  return (
    <Spring
      from={{ o: 0, x: -101 }}
      to={{ o: 1, x: 0 }}
      config={{ duration: 600, delay: 800, easing: easeSinOut }}
      native
    >
      {props => (
        <>
          <StyledUserContainer>
            {user.description && (
              <>
                <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
                  {matches =>
                    matches && user.pictures && user.pictures.length ? (
                      <ScrolledPictures {...props} pictures={user.pictures} altText={user.displayName} />
                    ) : null
                  }
                </Media>
                <Description {...props} description={<Markdown content={user.description} />}>
                  <Spring from={{ height }} to={{ height }} native config={{ duration: 450, easing: easeSinOut }}>
                    {({ height }) => {
                      return (
                        <animated.div
                          style={{
                            position: "relative",
                            marginBottom: 40,
                            height: height.interpolate(h => h)
                          }}
                        >
                          <Heading.H1 uppercase style={{ opacity: 0, margin: 0 }} ref={ref}>
                            {user.displayName}
                          </Heading.H1>
                          <Transition
                            keys={location.pathname}
                            from={{ o: 0, r: 4 }}
                            enter={{ o: 1, r: 0 }}
                            leave={{ o: 0, r: 0 }}
                            config={(_, type) => {
                              return { duration: type !== "leave" ? 550 : 1, easing: easeSinOut };
                            }}
                            native
                          >
                            {item => style => (
                              <Switch location={location}>
                                <Route
                                  path={CHARACTER}
                                  render={props => <CharacterDisplayName style={style} name={user.displayName} />}
                                />
                              </Switch>
                            )}
                          </Transition>
                        </animated.div>
                      );
                    }}
                  </Spring>
                </Description>
              </>
            )}
          </StyledUserContainer>
          <Slider />
        </>
      )}
    </Spring>
  );
}

export default withTheme(User);
