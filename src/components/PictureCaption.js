import React, { memo } from "react";
import styled from "styled-components";
import { Transition, animated, config } from "react-spring";

const StyledCaption = styled(animated.em).attrs(({ x, o }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: x.interpolate(x => `translateX(${x}px)`)
  }
}))`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  font-size: 1.25rem;
  padding: 0 5%;
  line-height: 1.35;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const PictureCaption = ({ caption }) => {
  return (
    <Transition
      items={[caption]}
      keys={item => item}
      from={{ x: 40, o: 0 }}
      enter={{ x: 0, o: 1 }}
      leave={{ x: -40, o: 0 }}
      config={(item, type) => {
        const returnedConfig = {
          ...config.default,
          duration: type === "enter" ? 400 : 250,
          delay: type === "enter" ? 250 : 0
        };
        return returnedConfig;
      }}
      native
    >
      {item => styles => <StyledCaption {...styles}>{item}</StyledCaption>}
    </Transition>
  );
};

export default memo(PictureCaption);
