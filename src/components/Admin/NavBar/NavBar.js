import React, { Component } from "react";
import styled from "styled-components";
import NavLink from "components/NavLink";
import { lowercasify } from "utils";
import { H2 } from 'UI/Heading';

const StyledNavBar = styled.header`
  min-height: 50px;
  padding: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNavItem = styled(NavLink)`
  margin: 0 2rem;
`;

export default function NavBar({ links }) {
  return (
    <StyledNavBar>
      {links.map(link => (
        <H2 key={link}>
          <StyledNavItem to={`/admin/${lowercasify(link)}`}>
            {link}
          </StyledNavItem>
        </H2>
      ))}
    </StyledNavBar>
  );
}
