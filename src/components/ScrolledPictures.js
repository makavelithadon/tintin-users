import React from "react";
import styled, { withTheme } from "styled-components";
import { animated, Spring, config } from "react-spring";
import PictureCaption from "./PictureCaption";
import { media, isDev, isOldBrowser } from "utils";
import { DEBUG } from "shared";
import ScrollHandler from "./ScrollHandler";
import Img from "UI/Img";

const StyledContainer = styled.div`
  position: relative;
  ${media.forEach({ xs: "100%", medium: "30%" }, w => `width: ${w};`)};
  background-color: ${({ theme }) => (isDev && DEBUG ? theme.colors.secondary : "none")};
`;

const StyledScrolledPictures = styled(animated.div).attrs(({ width, height, top, position, bottom }) => ({
  style: {
    position,
    bottom,
    width,
    height,
    top
  }
}))`
  overflow: hidden;
  will-change: width, opacity, top, bottom;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
`;

const StyledSlider = styled(animated.ul).attrs(({ w, h, x }) => ({
  style: {
    width: w,
    height: h,
    transform: `translate3d(-${x}px, -50%, 0)`
  }
}))`
  position: absolute;
  top: 50%;
  text-align: left;
  font-size: 0;
  will-change: width, height, transform;
  overflow: hidden;
  transition: ${({ theme }) => (isOldBrowser() ? "0.0s 0.0s linear" : `transform ${theme.transitions.primary}`)};
`;

const StyledSliderItem = styled.li.attrs(({ w, h, o }) => ({
  style: {
    width: w,
    height: h,
    opacity: o
  }
}))`
  position: relative;
  display: inline-block;
  will-change: width;
  vertical-align: top;
  ${({ theme }) =>
    isDev &&
    DEBUG &&
    `
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};
  `}
`;

const StyledScrollerWrapper = styled.div`
  height: 100%;
`;

const StyledImg = styled(Img)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  width: auto;
`;

const StyledPictureCaptionContainer = styled.div.attrs(({ top }) => ({
  style: {
    top
  }
}))`
  position: absolute;
  width: 100%;
  transition: ${({ theme }) => theme.transitions.primary};
`;

function getSlideOpacity(index, scrollerWidth, x) {
  const start = index * scrollerWidth;
  const end = (index + 1) * scrollerWidth;
  const isVisible = x + scrollerWidth > start && x <= end;
  let opacity;
  if (isVisible) {
    const rightCornerDistance = x + scrollerWidth;
    const isAppearing = rightCornerDistance > start && rightCornerDistance < end;
    const decalage = isAppearing ? rightCornerDistance - start : end - x;
    const visibilityPercentage = (decalage / scrollerWidth) * 100;
    opacity = visibilityPercentage / 100;
    opacity = isAppearing ? opacity + visibilityPercentage / 100 : opacity / (100 / visibilityPercentage);
    opacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  } else {
    opacity = 0;
  }
  return opacity;
}

function ScrolledPictures({ theme, pictures, altText, x }) {
  return (
    <StyledContainer>
      <ScrollHandler ref={React.createRef()} wrapper={StyledScrollerWrapper}>
        {({ height, isOverflow, isOverTop, isOverBottom, refWidth, refHeight, refTop }) => {
          const sliderWidth = refWidth * pictures.length;
          const frictionCoefficient = (refHeight - height) / (sliderWidth - refWidth);
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
            >
              <Spring
                from={{ w: 0, h: 0 }}
                to={{ w: sliderWidth, h: refWidth }}
                config={{ ...config.default, duration: 0.0001, delay: 0.0001 }}
                native
              >
                {({ x, w, h }) => (
                  <StyledSlider w={w} h={h} x={normalizedScrollX}>
                    {pictures.map((picture, index) => {
                      return (
                        <StyledSliderItem
                          key={picture.src}
                          w={refWidth}
                          h={refWidth}
                          o={getSlideOpacity(index, refWidth, normalizedScrollX)}
                        >
                          <StyledImg src={picture.src} alt={picture.caption} />
                        </StyledSliderItem>
                      );
                    })}
                  </StyledSlider>
                )}
              </Spring>
              {pictures[currentIndex] && (
                <StyledPictureCaptionContainer top={height / 2 + refWidth / 2 + 16}>
                  <PictureCaption caption={pictures[currentIndex].caption} />
                </StyledPictureCaptionContainer>
              )}
            </StyledScrolledPictures>
          );
        }}
      </ScrollHandler>
    </StyledContainer>
  );
}

export default withTheme(ScrolledPictures);
