import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import { animated, Spring, config } from "react-spring";
import { easeSinOut } from "d3-ease";
import { CHARACTER_SLUG } from "routes";
import { media, isDev } from "utils";
import { DEBUG } from "shared";
import ScrollHandler from "../ScrollHandler";
import Revealer from "components/Revealer";
import Slider from "./Slider";
import Caption from "./Caption";
import TransitionedComponent from "components/TransitionedComponent";

const StyledContainer = styled.div`
  position: relative;
  ${media.forEach({ xs: "100%", medium: "30%" }, w => `width: ${w};`)};
  background-color: ${({ theme }) =>
    isDev && DEBUG ? theme.colors.secondary : "none"};
`;

const StyledScrolledPictures = styled(animated.div).attrs(
  ({ o, width, height, top, position, bottom }) => ({
    style: {
      position,
      bottom,
      width,
      height,
      top
    }
  })
)`
  overflow: hidden;
  will-change: width, opacity, top, bottom;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
`;

const StyledScrollerWrapper = styled.div`
  height: 100%;
`;

const StyledRevealerContainer = styled.div.attrs(({ height }) => ({
  style: {
    height
  }
}))`
  width: 100%;
  top: 50%;
  left: 0;
  position: absolute;
  transform: translateY(-50%);
  z-index: 10;
`;

const sliderTransition = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  config: (_, type) => ({
    duration: type !== "leave" ? 500 : 250,
    delay: type !== "leave" ? 350 : 1,
    easing: easeSinOut
  })
};

function ScrolledPictures({ pictures, style }) {
  return (
    <StyledContainer>
      <ScrollHandler ref={React.createRef()} wrapper={StyledScrollerWrapper}>
        {({
          height,
          isOverflow,
          isOverTop,
          isOverBottom,
          refWidth,
          refHeight,
          refTop
        }) => {
          const sliderWidth = refWidth * pictures.length;
          const frictionCoefficient =
            (refHeight - height) / (sliderWidth - refWidth);
          const normalizedScrollX = isOverTop
            ? 0
            : isOverBottom
            ? sliderWidth - refWidth
            : -refTop / frictionCoefficient;
          const currentIndex = Math.floor(normalizedScrollX / refWidth);
          return (
            <StyledScrolledPictures
              position={isOverflow ? "absolute" : "fixed"}
              width={refWidth}
              height={"100vh"}
              top={isOverBottom ? "auto" : 0}
              bottom={isOverBottom ? 0 : "auto"}
              {...style}
            >
              <Spring
                from={{ width: 0, height: 0 }}
                to={{ width: sliderWidth, height: refWidth }}
                config={{ ...config.default, duration: 0.0001, delay: 0.0001 }}
                native
              >
                {({ width, height }) => (
                  <TransitionedComponent
                    transition={sliderTransition}
                    path={CHARACTER_SLUG}
                    render={({ opacity }) => (
                      <Revealer
                        wrapper={<StyledRevealerContainer height={refWidth} />}
                      >
                        <Slider
                          refWidth={refWidth}
                          items={pictures}
                          width={width}
                          height={height}
                          opacity={opacity}
                          x={normalizedScrollX}
                        />
                      </Revealer>
                    )}
                  />
                )}
              </Spring>
              {pictures[currentIndex] && (
                <Caption
                  top={height / 2 + refWidth / 2 + 16}
                  caption={pictures[currentIndex].caption}
                />
              )}
            </StyledScrolledPictures>
          );
        }}
      </ScrollHandler>
    </StyledContainer>
  );
}

export default withRouter(withTheme(ScrolledPictures));
