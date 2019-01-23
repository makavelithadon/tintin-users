import React, { useState } from "react";
import styled from "styled-components";
import { animated, Keyframes } from "react-spring";
import { easeSinOut } from "d3-ease";

const StyledSliderRevealer = styled.div.attrs(({ height }) => ({
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

const Layer = Keyframes.Spring({
  peek: [
    {
      width: 100,
      left: 0,
      from: { width: 0, right: 0, left: "auto" },
      config: { duration: 300, easing: easeSinOut }
    },
    {
      width: 0,
      right: "auto",
      left: 0,
      delay: 150,
      config: { duration: 400, easing: easeSinOut }
    }
  ]
});

const StyledLayer = styled(animated.div).attrs(({ left, right, width }) => ({
  style: {
    left: left.interpolate(l => l),
    right: right.interpolate(r => r),
    width: width.interpolate(w => `${w}%`)
  }
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`;

function SliderRevealer({ height, children, pictures: picturesFromParent }) {
  const [pictures] = useState(picturesFromParent);
  return (
    <StyledSliderRevealer height={height}>
      <Layer state={"peek"} native>
        {props => <StyledLayer {...props} />}
      </Layer>
      {children(pictures)}
    </StyledSliderRevealer>
  );
}

export default SliderRevealer;
