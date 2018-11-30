import React from "react";
import styled from "styled-components";
import { Keyframes, animated, config } from "react-spring";
import theme from "theme";
import { getSquareDiagonal } from "utils";
import {
  //easeLinear,
  easePolyIn,
  easePolyOut,
  /*easePolyInOut,
  easeCubicIn,
  easeCubicOut,
  easeCubicInOut,
  expInOut,
  easeQuadIn,
  easeQuadOut,
  easeQuadInOut,
  easeExpIn,*/
  easeExpOut
  /*easeExpInOut,
  easeCircleInOut,
  easeCircleOut,
  easeBackIn,
  easeBackOut,
  easeBackInOut,
  easeBounceInOut,
  ease*/
} from "d3-ease";

const squareWidth = 20;
const squareHeight = squareWidth;

const StyledIcon = styled(animated.ul).attrs(({ rotate }) => ({
  style: {
    //transform: rotate.interpolate(r => `rotate(${r}deg)`)
  }
}))`
  position: relative;
  width: ${squareWidth}px;
  height: ${squareHeight}px;
  cursor: pointer;
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
  height: 1px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
`;

const IconAnimation = Keyframes.Spring({
  enter: [
    {
      o: 1,
      w: getSquareDiagonal(squareWidth),
      rotate: 90,
      from: { w: 0, o: 0, rotate: 0 },
      config: { ease: easePolyOut, delay: 1000, duration: 225 }
    }
  ],
  leave: [{ w: 0, o: 0, rotate: 0 }]
});

export function AnimatedExit(props) {
  const { color, ...rest } = props;
  console.log("props", props);
  return (
    <IconAnimation state={props.animationState} native>
      {styles => (
        <StyledIcon {...rest} rotate={styles.rotate}>
          <StyledExitItem color={color} angle={45} {...styles} />
          <StyledExitItem color={color} angle={-45} {...styles} />
        </StyledIcon>
      )}
    </IconAnimation>
  );
}

AnimatedExit.defaultProps = {
  color: theme.colors.background
};
