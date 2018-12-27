import React, { Component } from "react";
import styled from "styled-components";
import NavLink from "components/NavLink";
import { lowercasify } from "utils";
import { H2 } from "UI/Heading";

const StyledSideBar = styled.header`
  position: fixed;
  width: 60px;
  height: 100vh;
  padding: 2rem;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.box};
`;

const StyledLinksContainer = styled.div`
  position: absolute;
  width: 100vh;
  transform: rotate(-90deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSideBarItem = styled(H2)`
  margin: 0 2rem;
  font-size: 1.7rem;
`;

export default function SideBar({ links }) {
  return (
    <StyledSideBar>
      <StyledLinksContainer>
        {links.map(link => (
          <StyledSideBarItem key={link.displayName}>
            <NavLink to={`/admin/${lowercasify(link.slug)}`}>{link.displayName}</NavLink>
          </StyledSideBarItem>
        ))}
      </StyledLinksContainer>
    </StyledSideBar>
  );
}
