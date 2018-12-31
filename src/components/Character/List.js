import React from "react";
import styled from "styled-components";
import { H2 } from "UI/Heading";
import { media } from "utils";
import { fillSizes, center } from "style-utils";
import NavLink from "components/NavLink";
import { formatRoute } from "react-router-named-routes";
import { CHARACTER } from "routes";

const StyledCharactersList = styled.ul`
  /* ${fillSizes()}; */
  display: flex;
  flex-wrap: nowrap;
  ${media.forEach({ medium: "0 2rem", large: "0 3rem" }, p => `padding: ${p};`)};
  ${media.forEach({ medium: 10 }, p => `padding: 0 10%;`)};
`;

const cardMargin = 0;
const cardMarginUnits = "rem";

const StyledCharacterCard = styled(NavLink)`
  position: relative;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${cardMargin + cardMarginUnits};
  /* ${media.forEach(
    { xs: 100, small: 50, medium: 33.3333, large: 20 },
    fB =>
      `width: calc(${fB}% - ${cardMargin * 2}${cardMarginUnits}); flex: 0 1 calc(${fB}% - ${cardMargin *
        2}${cardMarginUnits});`
  )}; */
  flex: 1;
  transition: .650s ease-out;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.box};
  &:hover {
    flex: 3;
  }
`;

const StyledCharacterDisplayName = styled(H2)`
  margin-bottom: 0;
  text-align: center;
  ${media.forEach({ xs: 2, small: 2.5 }, fZ => `font-size: ${fZ}rem;`)};
`;

export default function CharactersList({ characters }) {
  return (
    <StyledCharactersList>
      {characters.map(({ displayName, slug }) => (
        <StyledCharacterCard key={displayName} to={formatRoute(CHARACTER, { character: slug })}>
          <StyledCharacterDisplayName>{displayName}</StyledCharacterDisplayName>
        </StyledCharacterCard>
      ))}
    </StyledCharactersList>
  );
}
