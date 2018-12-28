import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import Markdown from "components/Markdown/Markdown";
import { Spring, Transition, animated } from "react-spring";
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

const StyledAnimatedCharacterDisplayName = styled(animated.h1).attrs(({ o, y }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: y.interpolate(y => `translateY(${y}px)`)
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

const CharacterDisplayName = withRouter(({ style, character: characterFromParent }) => {
  const [character] = useState(characterFromParent);
  return (
    <StyledAnimatedCharacterDisplayName {...style} uppercase color={"primary"}>
      {character.displayName}
    </StyledAnimatedCharacterDisplayName>
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
                  <Spring from={{ height }} to={{ height }} native>
                    {({ height }) => {
                      return (
                        <animated.div
                          style={{
                            position: "relative",
                            marginBottom: 30,
                            height: height.interpolate(h => h)
                          }}
                        >
                          <Heading.H1 uppercase style={{ opacity: 0, margin: 0 }} ref={ref}>
                            {user.displayName}
                          </Heading.H1>
                          <Transition
                            keys={location.pathname}
                            from={{ o: 0, y: 30 }}
                            enter={{ o: 1, y: 0 }}
                            leave={{ o: 0, y: -80 }}
                            config={(_, type) => {
                              return { duration: type !== "leave" ? 600 : 280, easing: easeSinOut };
                            }}
                            reset={true}
                            unique={true}
                            native
                          >
                            {item => style => (
                              <Switch location={location}>
                                <Route
                                  path={CHARACTER}
                                  render={props => <CharacterDisplayName style={style} character={user} />}
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
