import { animated } from "react-spring";
import styled from "styled-components";
import { fillSizes } from "style-utils";

const StyledLinkLetter = styled(animated.span).attrs(({ o, y }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: y.interpolate(y => `translate3d(0, ${y}%, 0)`)
  }
}))`
  ${fillSizes()}
`;

export default StyledLinkLetter;
