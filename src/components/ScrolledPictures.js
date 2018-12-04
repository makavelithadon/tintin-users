import React, { useRef, useState, useEffect } from "react";
import styled, { withTheme } from "styled-components";
import { animated } from "react-spring";
import { useWindowScrollPosition as useScroll, useWindowSize } from "the-platform";
import PictureCaption from "./PictureCaption";
import { media, isDev, isOldBrowser } from "utils";
import { DEBUG } from "shared";

const StyledContainer = styled.div`
  position: relative;
  ${media.forEach({ xs: "100%", medium: "30%" }, w => `width: ${w};`)};
  background-color: ${({ theme }) => (isDev && DEBUG ? theme.colors.secondary : "none")};
`;

const StyledScrolledPictures = styled(animated.div).attrs(({ o, width }) => ({
  style: {
    width: width,
    opacity: o.interpolate(o => o)
  }
}))`
  position: absolute;
  top: 0;
  height: 100vh;
  overflow: hidden;
  will-change: width, opacity, top, bottom;
  transition: ${({ theme }) => theme.transitions.primary};
`;

const StyledSlider = styled.ul.attrs(({ w, h, x, y }) => ({
  style: {
    width: w,
    height: h,
    transform: `translate(-${x}px, ${y}px)`
  }
}))`
  position: relative;
  text-align: left;
  font-size: 0;
  will-change: width, height, transform;
`;

const StyledSliderItem = styled.li.attrs(({ w }) => ({
  style: {
    width: w
  }
}))`
  position: relative;
  display: inline-block;
  height: 100%;
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

const getActiveIndex = (slidesCount, sliderWidth, x) => {
  const slideWidth = sliderWidth / slidesCount;
  return Math.floor(x / slideWidth);
};

const getActivePicture = (slidesCount, sliderWidth, x, sliderNode) => {
  const slideWidth = sliderWidth / slidesCount;
  const activeSlideIndex = getActiveIndex(slidesCount, sliderWidth, x);
  const activeSlideInteger = activeSlideIndex + 1;
  let slideOpacity = activeSlideInteger - x / slideWidth;
  if (slideOpacity < 0.25) {
    slideOpacity = slideOpacity / 2 - 0.25;
  } else if (slideOpacity < 0.5) {
    slideOpacity = slideOpacity / 1.5 - 0.125;
  }
  [...sliderNode.childNodes][activeSlideIndex].style.opacity = slideOpacity >= 0 ? slideOpacity : 0;
};

const handleScrollIntoContainer = (node, windowHeight) => {
  const { height, top } = node.getBoundingClientRect();
  const isOverBottom = height + top - windowHeight < 0;
  const isOverTop = top > 0;
  const isOver = isOverBottom || isOverTop;
  if (isOver) {
    node.firstElementChild.style.position = "absolute";
    node.firstElementChild.style.top = "auto";
    node.firstElementChild.style.bottom = isOverBottom ? 0 : "auto";
  } else if (top <= 0) {
    node.firstElementChild.style.position = "fixed";
    node.firstElementChild.style.top = 0;
  }
};

function Picture({ theme, user, x, ...props }) {
  const [calculatedWidth, setCalculatedWidth] = useState(1);
  const [calculatedFrictionCoefficient, setCalculatedFrictionCoefficient] = useState(10);
  const { y: scrollY } = useScroll({ throttleMs: isOldBrowser() ? 20 : 1 });
  const { width, height } = useWindowSize({ throttleMs: isOldBrowser() ? 20 : 1 });
  const container = useRef(null);
  const slider = useRef(null);
  const slidesCount = user.pictures.length;
  let normalizedXOffset = 0;
  const sliderWidth = calculatedWidth * slidesCount;
  if (container.current) {
    const { top } = container.current.getBoundingClientRect();
    normalizedXOffset = top <= 0 ? -top / calculatedFrictionCoefficient : 0;
  }
  useEffect(
    () => {
      handleScrollIntoContainer(container.current, height);
      const newCalculatedWidth = container.current.clientWidth;
      const newSliderWidth = newCalculatedWidth * slidesCount;
      setCalculatedWidth(newCalculatedWidth);
      const newCalculatedFrictionCoefficient =
        (container.current.clientHeight - height) / (newSliderWidth - newCalculatedWidth);
      setCalculatedFrictionCoefficient(newCalculatedFrictionCoefficient);
      const normalizedXOffset = scrollY / newCalculatedFrictionCoefficient;
      if (normalizedXOffset < newSliderWidth - newCalculatedWidth) {
        getActivePicture(slidesCount, newSliderWidth, normalizedXOffset, slider.current);
      }
    },
    [width, height, scrollY]
  );
  const currentIndex = getActiveIndex(slidesCount, sliderWidth, normalizedXOffset);
  return (
    <StyledContainer ref={container}>
      <StyledScrolledPictures {...props} width={calculatedWidth}>
        {user.pictures && user.pictures.length && (
          <>
            <StyledSlider
              ref={slider}
              w={sliderWidth}
              h={calculatedWidth}
              x={normalizedXOffset < sliderWidth - calculatedWidth ? normalizedXOffset : sliderWidth - calculatedWidth}
              y={height / 2 - calculatedWidth / 2}
            >
              {user.pictures.map(picture => (
                <StyledSliderItem key={picture.src} w={calculatedWidth}>
                  <img
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      margin: "0 auto",
                      maxWidth: "100%",
                      maxHeight: "100%"
                    }}
                    src={picture.src}
                    alt={`${user.displayName}:${picture.caption}`}
                  />
                </StyledSliderItem>
              ))}
            </StyledSlider>
            {user.pictures[currentIndex] && (
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  top: height / 2 + calculatedWidth / 2 + 16,
                  transition: theme.transitions.primary
                }}
              >
                <PictureCaption caption={user.pictures[currentIndex].caption} />
              </div>
            )}
          </>
        )}
      </StyledScrolledPictures>
    </StyledContainer>
  );
}

export default withTheme(Picture);
