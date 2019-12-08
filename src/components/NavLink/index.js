import React from "react";
import styled, { withTheme } from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
  transition: ${({ theme }) => theme.transitions.primary};
`;

function SimpleNavLink(props) {
  return <StyledNavLink {...props} />;
}

export default withTheme(SimpleNavLink);
