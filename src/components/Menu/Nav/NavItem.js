import { animated } from "react-spring";
import styled from "styled-components";
import { media } from "utils";

const StyledNavItem = styled(animated.li).attrs(({ o, rotate, y }) => ({
  style: {
    transform: rotate.interpolate(r => `rotate(${r}deg)`),
    visibility: o.interpolate(o => (o > 0 ? "visible" : "hidden")),
    pointerEvents: o.interpolate(o => (o >= 1 ? "auto" : "none"))
  }
}))`
  position: relative;
  text-align: left;
  user-select: none;
  line-height: 1;
  ${media.forEach({ xs: 3.5, small: 4, medium: 4.5, large: 5.5 }, fZ => `font-size: ${fZ}rem;`)};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: uppercase;
  transform-origin: -200px 50%;
  font-weight: 900;
`;

export default StyledNavItem;
