import React, { useState, useRef, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import Markdown from "components/Markdown/Markdown";
import { Spring, Transition, animated } from "react-spring";
import { easeSinOut } from "d3-ease";
import data from "data/index";
import ScrolledPictures from "components/ScrolledPictures";
import Slider from "components/Slider/Slider";
import Description from "components/Description";
import { DisplayName } from "components/Character";
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

const StyledFakeCharacterDisplayNameContainer = styled(animated.div).attrs(({ height }) => ({
  style: {
    height: height.interpolate(h => h)
  }
}))`
  position: relative;
  margin-bottom: 40px;
`;

const StyledFakeCharacterDisplayName = styled(Heading.H1)`
  opacity: 0;
  margin: 0;
`;

function Character({ theme, location }) {
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
    <>
      <StyledUserContainer>
        {user.description && (
          <>
            <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
              {matches =>
                matches && user.pictures && user.pictures.length ? (
                  <ScrolledPictures pictures={user.pictures} altText={user.displayName} />
                ) : null
              }
            </Media>
            <Description description={<Markdown content={user.description} />}>
              <Spring from={{ height }} to={{ height }} native config={{ duration: 450, easing: easeSinOut }}>
                {({ height }) => {
                  return (
                    <StyledFakeCharacterDisplayNameContainer height={height}>
                      <StyledFakeCharacterDisplayName uppercase ref={ref}>
                        {user.displayName}
                      </StyledFakeCharacterDisplayName>
                      <Transition
                        keys={location.pathname}
                        from={{ o: 0, r: 4 }}
                        enter={{ o: 1, r: 0 }}
                        leave={{ o: 0, r: 0 }}
                        config={(_, type) => ({ duration: type !== "leave" ? 550 : 1, easing: easeSinOut })}
                        native
                      >
                        {item => style => (
                          <Switch location={location}>
                            <Route
                              path={CHARACTER}
                              render={() => <DisplayName style={style} name={user.displayName} />}
                            />
                          </Switch>
                        )}
                      </Transition>
                    </StyledFakeCharacterDisplayNameContainer>
                  );
                }}
              </Spring>
            </Description>
          </>
        )}
      </StyledUserContainer>
      <Slider />
    </>
  );
}

export default withTheme(Character);
