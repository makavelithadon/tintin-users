import styled, { withTheme } from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
  transition: ${({ theme }) => theme.transitions.primary};
  &::after {
    content: "";
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.secondary};
    position: absolute;
    left: 50%;
    bottom: 3px;
    transform: translateX(-50%);
    transition: inherit;
  }
  &.active,
  &:hover {
    &::after {
      width: 100%;
    }
  }
`;

export default withTheme(StyledNavLink);
