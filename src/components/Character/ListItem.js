import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Spring, animated } from "react-spring";
import { media, stripUnits } from "utils";
import { H2 } from "UI/Heading";
import { fillSizes } from "style-utils";
import { inheritComponent } from "style-utils";
import Helpers from "UI/Helpers";
import Button from "UI/Button";
import { easeCircleInOut } from "d3-ease";

const StyledCharacter = styled.div`
  position: relative;
  ${fillSizes()};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  ${({ theme, charactersCount }) =>
    media.small`width: ${(80 * stripUnits(theme.breakpoints.values.medium)) / 100 / charactersCount}px;`}
  ${({ theme, charactersCount }) =>
    media.large`width: ${(75 * stripUnits(theme.breakpoints.values.large)) / 100 / charactersCount}px;`}
  transition: ${({ theme }) => theme.transitions.primary};
  transform-origin: 50% 100%;
`;

const StyledCharacterDisplayName = styled(H2)`
  margin-top: 4rem;
  margin-bottom: 2rem;
  text-align: center;
  ${media.forEach({ xs: 1.25, medium: 1.5 }, fZ => `font-size: ${fZ}rem;`)};
`;

const StyledButton = styled(animated.button).attrs(({ opacity, y }) => ({
  style: {
    opacity: opacity.interpolate(o => o),
    transform: y.interpolate(y => `translateY(${y}px)`)
  }
}))`
  ${props => inheritComponent(Button, props)};
  text-transform: uppercase;
  font-weight: 900;
`;

function CharacterListItem({ character, count, isSelected, history }) {
  const { displayName, pictures } = character;
  const hasPicture = pictures && pictures.length;
  return (
    <StyledCharacter component={animated.div} isSelected={isSelected}>
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
      <Spring
        from={{ opacity: 0, y: 15 }}
        to={{ opacity: Number(isSelected), y: isSelected ? 0 : 15 }}
        config={{ easing: easeCircleInOut, delay: isSelected ? 550 : 0 }}
        native
      >
        {({ opacity, y }) => (
          <StyledButton onClick={() => isSelected && history.push(character.slug)} opacity={opacity} y={y}>
            {"c'est parti"}
          </StyledButton>
        )}
      </Spring>
    </StyledCharacter>
  );
}

export default withRouter(CharacterListItem);
