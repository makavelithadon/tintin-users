import React from "react";
import styled, { withTheme } from "styled-components";
import { animated } from "react-spring";
import { media } from "utils";

const StyledDescription = styled(animated.div).attrs(({ x, o }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: x.interpolate(x => `translateY(${-x}px)`)
  }
}))`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  text-align: left;
  min-height: 100vh;
  ${media.forEach({ xs: "100%", medium: "70%" }, w => `width: ${w};`)};
  ${media.forEach({ xs: 0, medium: "6%" }, paddingLeft => `padding-left: ${paddingLeft};`)};
`;

function Description({ theme, description, children, ...rest }) {
  return (
    <StyledDescription {...rest}>
      {children && children}
      {description && description}
    </StyledDescription>
  );
}

export default withTheme(Description);
