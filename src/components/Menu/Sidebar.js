import React, { useContext } from "react";
import styled from "styled-components";
import Burger from "./Burger";
import { media } from "utils";

const StyledSidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  z-index: 21;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => media.forEach(theme.sizes.header.height, h => `width: ${h}`)};
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Burger />
    </StyledSidebar>
  );
}
