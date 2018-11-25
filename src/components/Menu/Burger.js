import React, { useContext } from "react";
import styled from "styled-components";
import { MenuContext } from "./index";

const burgerWidth = 30;
const burgerHeight = 16;

const StyledBurgerContainer = styled.ul`
  position: relative;
  width: ${burgerWidth}px;
  height: ${burgerHeight}px;
  cursor: pointer;
`;

const itemHeight = 2;

const StyledBurgerItem = styled.li`
  position: absolute;
  height: ${itemHeight}px;
  border-radius: 5px;
  width: ${props => (props.index === 2 ? "75%" : "100%")};
  background-color: ${props => props.theme.colors.darkGrey}
  top: ${props => `${Math.floor(props.index * (burgerHeight / 2) - itemHeight)}px`};
`;

export default function Burger() {
  const { toggle } = useContext(MenuContext);
  return (
    <StyledBurgerContainer onClick={() => toggle()}>
      {[...new Array(3)].map((_, index) => {
        return <StyledBurgerItem key={index} index={index} />;
      })}
    </StyledBurgerContainer>
  );
}
