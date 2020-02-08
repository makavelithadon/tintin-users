import React from "react";
import styled from "styled-components";
import { Keyframes, animated } from "react-spring";
import theme from "theme";
import { getSquareDiagonal } from "utils";
import { easePolyOut } from "d3-ease";

const sizes = {
  tiny: 14,
  medium: 20,
  big: 28
};

const StyledIcon = styled(animated.ul)`
  position: relative;
  width: ${({ size }) => sizes[size]}px;
  height: ${({ size }) => sizes[size]}px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.primary};
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledExitItem = styled(animated.li).attrs(({ o, w }) => ({
  style: {
    opacity: o.interpolate(o => o),
    width: w.interpolate(w => w)
  }
}))`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: ${({ angle }) => `translate(-50%, -50%) rotate(${angle}deg);`};
  height: 1.5px;
  background-color: ${({ theme, color }) =>
    color
      ? theme.colors[color]
        ? theme.colors[color]
        : color
      : theme.colors.white};
  border-radius: 5px;
`;

const IconAnimation = Keyframes.Spring({
  enter: async (next, cancel, { size, immediate }) => {
    await next({
      o: 1,
      w: getSquareDiagonal(sizes[size]),
      rotate: 90,
      from: { w: 0, o: 0, rotate: 0 },
      config: { ease: easePolyOut, delay: immediate ? 1 : 750, duration: 225 }
    });
  },
  leave: [{ w: 0, o: 0, rotate: 0 }]
});

export function AnimatedExit(props) {
  const { color, animationState, size, immediate, ...rest } = props;
  return (
    <IconAnimation
      state={animationState}
      size={size}
      immediate={immediate}
      native
    >
      {styles => (
        <StyledIcon size={size} {...rest} rotate={styles.rotate}>
          <StyledExitItem color={color} angle={45} {...styles} />
          <StyledExitItem color={color} angle={-45} {...styles} />
        </StyledIcon>
      )}
    </IconAnimation>
  );
}

AnimatedExit.defaultProps = {
  color: theme.colors.background,
  size: "medium",
  immediate: true
};
