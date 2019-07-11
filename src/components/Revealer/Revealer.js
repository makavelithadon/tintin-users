import React from "react";
import styled from "styled-components";
import { animated, Keyframes } from "react-spring";
import { easeSinOut } from "d3-ease";

const StyledDefaultRevealerContainer = styled.div`
  position: relative;
`;

const StyledRevealerContainer = styled(({ component, ...props }) => React.cloneElement(component, props))`
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
  background-color: ${({ theme, color }) => (theme.colors[color] ? theme.colors[color] : theme.colors.background)};
  z-index: 1;
`;

function Revealer({ wrapper: Wrapper, color, children }) {
  const UI = (
    <>
      <Layer state={"peek"} native>
        {props => <StyledLayer color={color} {...props} />}
      </Layer>
      {children}
    </>
  );
  return Wrapper.type ? (
    <StyledRevealerContainer component={Wrapper}>{UI}</StyledRevealerContainer>
  ) : (
    <Wrapper>{UI}</Wrapper>
  );
}

Revealer.defaultProps = {
  wrapper: StyledDefaultRevealerContainer,
  color: "background"
};

export default Revealer;
