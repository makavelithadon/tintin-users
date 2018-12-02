import React, { useRef, useState, useEffect } from "react";
import styled, { withTheme } from "styled-components";
import { animated } from "react-spring";
import { useWindowScrollPosition as useScroll, useWindowSize } from "the-platform";
import PictureCaption from "./PictureCaption";
import { media, isDev, isOldBrowsers } from "utils";

const StyledContainer = styled.div`
  padding-top: 15vh;
  position: relative;
  ${media.forEach({ xs: "100%", medium: "30%" }, w => `width: ${w};`)};
  background-color: ${({ theme }) => (isDev ? theme.colors.secondary : "none")};
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
  display: flex;
  align-items: center;
  overflow: hidden;
  will-change: width, opacity;
  transition: ${({ theme }) => theme.transitions.primary};
`;

const StyledSlider = styled.ul.attrs(({ w, h, x }) => ({
  style: {
    width: w,
    height: h,
    transform: `translateX(-${x}px)`
  }
}))`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  will-change: width, height, transform;
  ${({ theme }) => `transition: ${isOldBrowsers() ? "0s 0s linear" : theme.transitions.primary}`};
  ${({ theme }) =>
    isDev &&
    `
    background-color: ${theme.colors.primary};
  `}
`;

const StyledSliderItem = styled.li.attrs(({ w }) => ({
  style: {
    width: w
  }
}))`
  display: flex;
  align-items: flex-end;
  height: 100%;
  will-change: width;
  transition: ${({ theme }) => theme.transitions.primary};
  ${({ theme }) =>
    isDev &&
    `
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.danger};
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
  [...sliderNode.childNodes][activeSlideIndex].style.opacity = slideOpacity;
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
  } else if (top < 0) {
    node.firstElementChild.style.position = "fixed";
    node.firstElementChild.style.top = 0;
  }
};

function Picture({ theme, user, x, ...props }) {
  const [calculatedWidth, setCalculatedWidth] = useState(1);
  const [calculatedFrictionCoefficient, setCalculatedFrictionCoefficient] = useState(10);
  const { y: scrollY } = useScroll({ throttleMs: 1 });
  const { width, height } = useWindowSize({ throttleMs: 1 });
  const container = useRef(null),
    slider = useRef(null);
  const slidesCount = user.pictures.length;
  const normalizedXOffset = scrollY / calculatedFrictionCoefficient;
  const sliderWidth = calculatedWidth * slidesCount;
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
            >
              {user.pictures.map(picture => (
                <StyledSliderItem key={picture.src} w={calculatedWidth}>
                  <img
                    style={{ margin: "0 auto", maxWidth: "100%", maxHeight: "100%" }}
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
