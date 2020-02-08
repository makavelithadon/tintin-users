import React, { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import Img from "UI/Img";
import { isOldBrowser } from "utils";
import { isDev } from "utils";
import { DEBUG } from "shared";

const StyledSlider = styled(animated.ul).attrs(
  ({ width, height, opacity, x }) => ({
    style: {
      opacity: opacity.interpolate(o => o),
      width,
      height,
      transform: `translate3d(-${x}px, -50%, 0)`
    }
  })
)`
  position: absolute;
  top: 50%;
  text-align: left;
  font-size: 0;
  will-change: width, height, transform;
  overflow: hidden;
  transition: ${({ theme }) =>
    isOldBrowser()
      ? "0.0s 0.0s linear"
      : `transform ${theme.transitions.primary}`};
`;

const StyledSliderItem = styled.li.attrs(({ width, height, opacity }) => ({
  style: {
    width,
    height,
    opacity
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

function getSlideOpacity(index, scrollerWidth, x) {
  const start = index * scrollerWidth;
  const end = (index + 1) * scrollerWidth;
  const isVisible = x + scrollerWidth > start && x <= end;
  let opacity;
  if (isVisible) {
    const rightCornerDistance = x + scrollerWidth;
    const isAppearing =
      rightCornerDistance > start && rightCornerDistance < end;
    const decalage = isAppearing ? rightCornerDistance - start : end - x;
    const visibilityPercentage = (decalage / scrollerWidth) * 100;
    opacity = visibilityPercentage / 100;
    opacity = isAppearing
      ? opacity + visibilityPercentage / 100
      : opacity / (100 / visibilityPercentage);
    opacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  } else {
    opacity = 0;
  }
  return opacity;
}

const ScrolledPicturesSlider = ({
  items: persistentItems,
  refWidth,
  children,
  ...restProps
}) => {
  const [items] = useState(persistentItems);
  return (
    <StyledSlider {...restProps}>
      {items.map((picture, index) => (
        <StyledSliderItem
          key={picture.src}
          width={refWidth}
          height={refWidth}
          opacity={getSlideOpacity(index, refWidth, restProps.x)}
        >
          <StyledImg src={picture.src} alt={picture.caption} />
        </StyledSliderItem>
      ))}
    </StyledSlider>
  );
};

export default ScrolledPicturesSlider;
