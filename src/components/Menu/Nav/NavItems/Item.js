import React from "react";
import styled, { css } from "styled-components";
import NavLink from "components/NavLink";
import { media } from "utils";
import { CHARACTER_SLUG } from "routes";
import { formatRoute } from "react-router-named-routes";
import RotatedSlidedUpText from "components/Animations/Text/RotatedSlidedUp";

const StyledNavLink = styled(NavLink)`
  color: inherit;
`;

const StyledNavItem = styled.li`
  position: relative;
  text-align: left;
  user-select: none;
  line-height: 1;
  ${media.forEach(
    { xs: 3.5, small: 4, medium: 4.5, large: 5.5 },
    fZ => `font-size: ${fZ}rem;`
  )};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: uppercase;
  transform-origin: -200px 50%;
  font-weight: 900;
  ${({ isHoverable }) =>
    isHoverable &&
    css`
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    `}
`;

export default function NavItem({
  isActive,
  isHoverable,
  item,
  onClick,
  animationState,
  isNavOpen
}) {
  return (
    <StyledNavItem isActive={isActive} isHoverable={isHoverable}>
      <StyledNavLink
        to={formatRoute(CHARACTER_SLUG, { character: item.slug })}
        onClick={onClick}
      >
        <RotatedSlidedUpText
          text={item.displayName}
          config={{
            leave: {
              delay: 1
            }
          }}
          animationState={animationState}
          reverse={!isNavOpen}
        />
      </StyledNavLink>
    </StyledNavItem>
  );
}
