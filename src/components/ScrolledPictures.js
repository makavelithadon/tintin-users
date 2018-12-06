import React from "react";
import styled, { withTheme } from "styled-components";
import { animated, Spring, config } from "react-spring";
import PictureCaption from "./PictureCaption";
import { media, isDev } from "utils";
import { DEBUG } from "shared";
import Scroller from "./Scroller";
import Img from "UI/Img";

const StyledContainer = styled.div`
  position: relative;
  ${media.forEach({ xs: "100%", medium: "30%" }, w => `width: ${w};`)};
  background-color: ${({ theme }) => (isDev && DEBUG ? theme.colors.secondary : "none")};
`;

const StyledScrolledPictures = styled(animated.div).attrs(({ o, width, height, top, position, bottom }) => ({
  style: {
    position,
    bottom,
    width,
    height,
    top,
    opacity: o.interpolate(o => o)
  }
}))`
  overflow: hidden;
  will-change: width, opacity, top, bottom;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
`;

const StyledSlider = styled(animated.ul).attrs(({ w, h, x }) => ({
  style: {
    width: w.interpolate(w => w),
    height: h.interpolate(h => h),
    transform: x.interpolate(x => `translate(-${x}px, -50%)`)
  }
}))`
  position: absolute;
  top: 50%;
  text-align: left;
  font-size: 0;
  will-change: width, height, transform;
  overflow: hidden;
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
    opacity = 1;
  }
  return opacity;
}

function ScrolledPictures({ theme, user, x, ...props }) {
  const ref = React.createRef();
  return (
    <StyledContainer>
      <Scroller ref={ref} wrapper={StyledScrollerWrapper}>
        {({ windowHeight, isOverflow, isOverTop, offsetTop, isOverBottom, scrollerWidth }) => {
          const sliderWidth = scrollerWidth * user.pictures.length;
          const frictionCoefficient =
            (ref.current ? ref.current.clientHeight - windowHeight : 0) / (sliderWidth - scrollerWidth);
          const normalizedScrollX = isOverTop
            ? 0
            : isOverBottom
            ? sliderWidth - scrollerWidth
            : -offsetTop / frictionCoefficient;
          const currentIndex = Math.floor(normalizedScrollX / scrollerWidth);
          return (
            <StyledScrolledPictures
              {...props}
              position={isOverflow ? "absolute" : "fixed"}
              width={scrollerWidth}
              height={windowHeight}
              top={isOverBottom ? "auto" : 0}
              bottom={isOverBottom ? 0 : "auto"}
            >
              <Spring
                from={{ x: 0, w: 0, h: 0 }}
                to={{ x: normalizedScrollX, w: sliderWidth, h: scrollerWidth }}
                config={{ ...config.default, duration: 0.000001, delay: 0.000001 }}
                native
              >
                {({ x, w, h }) => (
                  <StyledSlider w={w} h={h} x={x}>
                    {user.pictures.map((picture, index) => {
                      return (
                        <StyledSliderItem
                          key={picture.src}
                          w={scrollerWidth}
                          h={scrollerWidth}
                          o={getSlideOpacity(index, scrollerWidth, normalizedScrollX)}
                        >
                          <StyledImg src={picture.src} alt={`${user.displayName}:${picture.caption}`} />
                        </StyledSliderItem>
                      );
                    })}
                  </StyledSlider>
                )}
              </Spring>
              {user.pictures[currentIndex] && (
                <StyledPictureCaptionContainer top={windowHeight / 2 + scrollerWidth / 2 + 16}>
                  <PictureCaption caption={user.pictures[currentIndex].caption} />
                </StyledPictureCaptionContainer>
              )}
            </StyledScrolledPictures>
          );
        }}
      </Scroller>
    </StyledContainer>
  );
}

export default withTheme(ScrolledPictures);
