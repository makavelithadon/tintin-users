import React from "react";
import styled from "styled-components";
import NavLink from "components/NavLink";
import { media } from "utils";
import { CHARACTER_SLUG } from "routes";
import { formatRoute } from "react-router-named-routes";
import { withConfig } from "components/Animations/Text/RotatedSlidedUp";

const RotatedSlidedUpTextWithConfig = withConfig({
  leave: {
    delay: 1
  }
});

const StyledNavLink = styled(NavLink)`
  color: inherit;
`;

const StyledNavItem = styled.li`
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

export default function NavItem({ item, onClick, animationState, isNavOpen }) {
  return (
    <StyledNavItem>
      <StyledNavLink to={formatRoute(CHARACTER_SLUG, { character: item.slug })} onClick={onClick}>
        <RotatedSlidedUpTextWithConfig
          text={item.displayName}
          animationState={animationState}
          reverse={!isNavOpen}
          native
        />
      </StyledNavLink>
    </StyledNavItem>
  );
}
