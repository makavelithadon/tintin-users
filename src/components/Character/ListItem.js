import React from "react";
import styled from "styled-components";
import { media, stripUnits, filterObjectByKey } from "utils";
import { H2 } from "UI/Heading";
import { fillSizes } from "style-utils";

const StyledCharacter = styled.div`
  position: relative;
  cursor: pointer;
  ${fillSizes()};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledImg = styled.img`
  ${({ theme, charactersCount }) =>
    media.medium`width: ${(70 * stripUnits(theme.breakpoints.values.medium)) /
      100 /
      charactersCount}px;${StyledCharacter}:hover & { width: ${(100 * stripUnits(theme.breakpoints.values.medium)) /
      100 /
      charactersCount}px; }`}
  ${({ theme, charactersCount }) =>
    media.large`width: ${(70 * stripUnits(theme.breakpoints.values.large)) /
      100 /
      charactersCount}px;${StyledCharacter}:hover & { width: ${(100 * stripUnits(theme.breakpoints.values.large)) /
      100 /
      charactersCount}px; }`}
  transition: ${({ theme }) => theme.transitions.primary};
  ${StyledCharacter}:hover & {
    transition-delay: 300ms;
  }
`;

const StyledCharacterDisplayName = styled(H2)`
  margin-bottom: 0;
  margin-top: 2rem;
  text-align: center;
  ${media.forEach({ xs: 1.25 }, fZ => `font-size: ${fZ}rem;`)};
`;

export default function CharacterListItem({ character, onSelect, count }) {
  const { displayName, pictures } = character;
  const hasPicture = pictures && pictures.length;
  return (
    <StyledCharacter onClick={onSelect}>
      {hasPicture && <StyledImg src={pictures[0].src} charactersCount={count} />}
      <StyledCharacterDisplayName color={"primary"}>
        {displayName.includes(" ")
          ? displayName.split(" ").map(word => (
              <React.Fragment key={word}>
                <span>{word}</span>
                <br />
              </React.Fragment>
            ))
          : displayName}
      </StyledCharacterDisplayName>
    </StyledCharacter>
  );
}
