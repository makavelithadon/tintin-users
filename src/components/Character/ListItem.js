import React from "react";
import styled from "styled-components";
import { media, stripUnits } from "utils";
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
  transition: 0.125s ease-in;
  /* border-bottom: 6px solid transparent; */
  &:hover {
    transition: 0.275s ease-in;
    transition-delay: 75ms;
    box-shadow: 0px 3px 69px 2px rgba(0, 0, 0, 0.15);
    background-color: ${({ theme }) => theme.colors.background};
    /*border-bottom: 6px solid ${({ theme }) => theme.colors.primary};*/
  }
`;

const StyledImg = styled.img`
  ${({ theme, charactersCount }) =>
    media.medium`width: ${(80 * stripUnits(theme.breakpoints.values.medium)) / 100 / charactersCount}px;`}
  ${({ theme, charactersCount }) =>
    media.large`width: ${(75 * stripUnits(theme.breakpoints.values.large)) / 100 / charactersCount}px;`}
  transition: ${({ theme }) => theme.transitions.primary};
  transform-origin: 50% 100%;
  ${StyledCharacter}:hover & {
    transition-delay: 300ms;
    transform: scale(1.2);
  }
`;

const StyledCharacterDisplayName = styled(H2)`
  margin-bottom: 0;
  margin-top: 4rem;
  text-align: center;
  ${media.forEach({ xs: 1.25 }, fZ => `font-size: ${fZ}rem;`)};
`;

export default function CharacterListItem({ character, onSelect, count }) {
  const { displayName, pictures } = character;
  const hasPicture = pictures && pictures.length;
  return (
    <StyledCharacter onClick={onSelect}>
      {hasPicture && <StyledImg src={pictures[0].src} charactersCount={count} />}
      <StyledCharacterDisplayName color={"text"} uppercase>
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
