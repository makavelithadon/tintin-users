import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { useWindowScrollPosition as useScroll, useWindowSize } from "the-platform";
import { media, isDev } from "utils";

const StyledContainer = styled.div`
  ${media.forEach({ xs: "100%", medium: "30%" }, w => `width: ${w};`)};
  background-color: ${({ theme }) => (isDev ? theme.colors.secondary : "none")};
`;

const StyledScrolledPictures = styled(animated.div).attrs(({ o, width }) => ({
  style: {
    width: width,
    opacity: o.interpolate(o => o)
  }
}))`
  position: fixed;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.primary};
`;

const StyledSlider = styled.ul.attrs(({ w, x }) => ({
  style: {
    width: w,
    transform: `translateX(-${x}px)`
  }
}))`
  height: 50vh;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  transition: ${({ theme }) => theme.transitions.primary};
  ${({ theme }) =>
    isDev &&
    `
    background-color: ${theme.colors.primary};
    opacity: 0.5;
  `}
`;

const StyledSliderItem = styled.li.attrs(({ w }) => ({
  style: {
    width: w
  }
}))`
  display: flex;
  align-items: center;
  transition: ${({ theme }) => theme.transitions.primary};
  ${({ theme }) =>
    isDev &&
    `
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.danger};
  `}
`;

export default function Picture({ user, x, ...props }) {
  const [calculatedWidth, setCalculatedWidth] = useState(0);
  const [calculatedFrictionCoefficient, setCalculatedFrictionCoefficient] = useState(10);
  let { y: scrollY } = useScroll({ throttleMs: 1 });
  const { width, height } = useWindowSize({ throttleMs: 1 });
  const ref = useRef(null);
  const normalizedXOffset = scrollY / calculatedFrictionCoefficient;
  const sliderWidth = calculatedWidth * user.pictures.length;
  console.log("calculatedFrictionCoefficient", calculatedFrictionCoefficient);
  useEffect(
    () => {
      if (ref.current) {
        setCalculatedWidth(ref.current.clientWidth);
        setCalculatedFrictionCoefficient((ref.current.clientHeight - height) / (sliderWidth - calculatedWidth));
      }
    },
    [width, height, scrollY]
  );
  return (
    <StyledContainer ref={ref}>
      <StyledScrolledPictures {...props} width={calculatedWidth}>
        {user.pictures && user.pictures.length && (
          <StyledSlider
            w={sliderWidth}
            x={normalizedXOffset < sliderWidth - calculatedWidth ? normalizedXOffset : sliderWidth - calculatedWidth}
          >
            {user.pictures.map(picture => (
              <StyledSliderItem key={picture.src} w={calculatedWidth}>
                <img style={{ margin: "0 auto" }} src={picture.src} alt={user.displayName} width={"70%"} />
              </StyledSliderItem>
            ))}
          </StyledSlider>
        )}
      </StyledScrolledPictures>
    </StyledContainer>
  );
}
