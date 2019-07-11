import styled from "styled-components";
import { animated } from "react-spring";

const StyledSnackBar = styled(animated.div).attrs(({ o, y }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: y.interpolate(y => `translateY(${y}%)`)
  }
}))`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  min-height: 5vh;
  padding: 2rem 2.4rem;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  box-shadow: ${({ theme }) => theme.shadows.box};
`;

export default StyledSnackBar;
