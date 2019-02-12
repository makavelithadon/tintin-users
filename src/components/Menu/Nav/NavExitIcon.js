import React from "react";
import styled, { withTheme } from "styled-components";
import { AnimatedExit as Exit } from "UI/Icons";
import { media } from "utils";

const StyledExitIconContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  ${({ theme }) => media.xs`
  top: ${parseInt(theme.styles.header.height.xs, 10) / 2}px;
  right: 12px;
  `}
  ${({ theme }) => {
    const sizes = { ...theme.styles.sidebar.width };
    delete sizes.xs;
    return media.forEach(sizes, h => `left: ${parseInt(h, 10) / 2}px; top: 50%; right: auto;`);
  }};
`;

const NavExitIcon = ({ animationState, onClick }) => (
  <StyledExitIconContainer>
    <Exit onClick={onClick} animationState={animationState} immediate={false} color={"white"} />
  </StyledExitIconContainer>
);

export default NavExitIcon;
