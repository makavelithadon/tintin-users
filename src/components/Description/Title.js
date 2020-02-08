import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Spring, animated } from "react-spring";
import { easeSinOut } from "d3-ease";
import { DisplayName } from "components/Character";
import { useViewport } from "hooks";
import { CHARACTER_SLUG } from "routes";
import * as Heading from "UI/Heading";
import TransitionedComponent from "components/TransitionedComponent";

const StyledFakeCharacterDisplayNameContainer = styled(animated.div).attrs(
  ({ height }) => ({
    style: {
      height: height.interpolate(h => h)
    }
  })
)`
  position: relative;
  margin-bottom: 40px;
`;

const StyledFakeCharacterDisplayName = styled(Heading.H1)`
  opacity: 0;
  margin: 0;
  user-select: none;
  text-transform: uppercase;
`;

const transitionTitle = {
  from: { o: 0, r: 4 },
  enter: { o: 1, r: 0 },
  leave: { o: 0, r: 0 },
  config: (_, type) => ({
    duration: type !== "leave" ? 550 : 1,
    easing: easeSinOut
  })
};

const StyledWord = styled.span`
  display: inline-block;
  white-space: nowrap;
`;

function Title({ title, location, character }) {
  const [height, setHeight] = useState(0);
  const { width: windowWidth, height: windowHeight } = useViewport();
  const ref = useRef(null);
  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, [location.pathname, windowWidth, windowHeight]);
  const words = title.split(" ");

  return (
    <Spring
      from={{ height }}
      to={{ height }}
      config={{ duration: 450, easing: easeSinOut }}
      native
    >
      {({ height }) => {
        return (
          <StyledFakeCharacterDisplayNameContainer height={height}>
            <StyledFakeCharacterDisplayName ref={ref}>
              {words.map((letter, index) => {
                return (
                  <StyledWord key={`${letter}-${index}`}>
                    <span key={letter + index}>{letter}</span>
                    {index !== words.length - 1 && (
                      <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />
                    )}
                  </StyledWord>
                );
              })}
            </StyledFakeCharacterDisplayName>
            <TransitionedComponent
              transition={transitionTitle}
              path={CHARACTER_SLUG}
              render={(styles, props) => (
                <DisplayName style={styles} name={title} {...props} />
              )}
            />
          </StyledFakeCharacterDisplayNameContainer>
        );
      }}
    </Spring>
  );
}

export default withRouter(Title);
