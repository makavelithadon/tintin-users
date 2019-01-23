import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Keyframes, animated } from "react-spring";
import { easeSinOut } from "d3-ease";
import { fillSizes } from "style-utils";

const initialConfig = {
  enter: key => ({
    clamp: true,
    duration: key === "o" ? 500 : 700,
    easing: easeSinOut,
    delay: 300
  }),
  leave: { easing: easeSinOut, clamp: true, duration: 700 }
};

const initialAnimation = {
  enter: [
    {
      o: 1,
      y: 0,
      from: { o: 0, y: 60 },
      config: initialConfig.enter
    }
  ],
  leave: [{ o: 0, y: 60, config: initialConfig.leave }]
};

const normalizeConfig = (config, arg) => (typeof config === "function" ? config(arg) : config);

const createConfig = (configProps, animationKey) => key => {
  let c = { ...normalizeConfig(initialConfig[animationKey], key) };
  if (!configProps) return c;
  return {
    ...c,
    ...normalizeConfig(configProps, key)
  };
};

const createAnimation = config =>
  Keyframes.Trail(
    Object.keys(initialAnimation).reduce(
      (anim, key) => ({
        ...anim,
        [key]: initialAnimation[key].map(step => ({
          ...step,
          config: createConfig(config && config[key], key)
        }))
      }),
      {}
    )
  );

const StyledContainer = styled.span`
  overflow: hidden;
  position: relative;
`;

const StyledFakeLetter = styled.span`
  opacity: 0;
  user-select: none;
`;

const StyledLetter = styled(animated.span).attrs(({ o, y }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: y.interpolate(y => `translate3d(0, ${y}px, 0)`)
  }
}))`
  ${fillSizes()};
  bottom: auto;
  will-change: transform, opacity;
`;

const DefaultAnimation = createAnimation(initialConfig);

const RotatedSlidedUpText = ({ animation: AnimationProps, text, animationState, children, ...rest }) => {
  const ComponentToRender = AnimationProps ? AnimationProps : DefaultAnimation;
  return (
    <ComponentToRender
      items={text.split("").map((letter, index) => ({ letter, index }))}
      keys={item => `${item.letter}-${item.index}`}
      state={animationState}
      {...rest}
    >
      {item => props => {
        return (
          <StyledContainer>
            <StyledFakeLetter>{item.letter}</StyledFakeLetter>
            <StyledLetter {...props}>{item.letter}</StyledLetter>
            {children && typeof children === "function" && children(item)(props)}
          </StyledContainer>
        );
      }}
    </ComponentToRender>
  );
};

RotatedSlidedUpText.defaultProps = {
  animationState: "enter",
  native: true
};

RotatedSlidedUpText.propTypes = {
  text: PropTypes.string.isRequired,
  animationState: PropTypes.string,
  native: PropTypes.bool,
  reverse: PropTypes.bool
};

RotatedSlidedUpText.displayName = RotatedSlidedUpText.name || "RotatedSlidedUpText";

export default RotatedSlidedUpText;

export const withConfig = config => {
  const animation = createAnimation(config);
  return props => <RotatedSlidedUpText {...props} animation={animation} />;
};
