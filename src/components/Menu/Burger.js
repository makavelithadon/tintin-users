import React from "react";
import styled from "styled-components";
import Menu from ".";

const burgerWidth = 30;
const burgerHeight = 16;

const itemHeight = 2;

const StyledBurgerItem = styled.li`
  position: absolute;
  height: ${itemHeight}px;
  border-radius: 5px;
  width: ${props => (props.index === 2 ? "75%" : "100%")};
  background-color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.darkGrey)}
  top: ${({ index }) => `${Math.floor(index * (burgerHeight / 2) - itemHeight)}px`};
  transition: ${({ theme }) => theme.transitions.primary};
`;

const StyledBurgerContainer = styled.ul`
  position: relative;
  width: ${burgerWidth}px;
  height: ${burgerHeight}px;
  cursor: pointer;
  &:hover {
    ${StyledBurgerItem}:first-child {
      transform: translate3d(0, -3px, 0);
    }
    ${StyledBurgerItem}:last-child {
      transform: translate3d(0, 3px, 0);
    }
  }
`;

export default function Burger({ color, ...props }) {
  return (
    <Menu.Consumer>
      {({ toggle }) => (
        <StyledBurgerContainer onClick={() => toggle(true)} {...props}>
          {[...new Array(3)].map((_, index) => {
            return <StyledBurgerItem key={index} index={index} color={color} />;
          })}
        </StyledBurgerContainer>
      )}
    </Menu.Consumer>
  );
}
