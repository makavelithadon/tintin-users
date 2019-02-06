import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import { CHARACTER_SLUG } from "routes";
import { Spring, animated } from "react-spring";
import { media, stripUnits } from "utils";
import { H2 } from "UI/Heading";
import { fillSizes } from "style-utils";
import { inheritComponent } from "style-utils";
import Helpers from "UI/Helpers";
import Button from "UI/Button";
import { easeCircleInOut } from "d3-ease";

const StyledCharacterBase = styled.div`
  position: relative;
  ${fillSizes()};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  transition: 0.125s ease-in;
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.transparent : theme.colors.white)};
  box-shadow: ${({ theme, isSelected }) => (isSelected ? "none" : theme.shadows.box2)};
  border-radius: 6px;
  transition: ${({ isSelected }) => (isSelected ? "350ms 175ms ease-out" : "250ms ease-out")};
`;

const StyledCharacter = styled(Helpers.FilterInvalidDOMAttributes).attrs(({ x }) => ({
  style: {
    transform: x.interpolate(x => `translateX(${x}px)`)
  }
}))`
  ${props => inheritComponent(StyledCharacterBase, props)};
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
  ${media.forEach({ xs: 1.25 }, fZ => `font-size: ${fZ}rem;`)};
`;

const StyledButton = styled(Helpers.FilterInvalidDOMAttributes).attrs(({ opacity, y }) => ({
  style: {
    opacity: opacity.interpolate(o => o),
    transform: y.interpolate(y => `translateY(${y}px)`)
  }
}))`
  ${props => inheritComponent(Button, props)};
  text-transform: uppercase;
  font-weight: 900;
`;

export default function CharacterListItem({ character, onSelect, count, x, isSelected }) {
  const { displayName, pictures } = character;
  const hasPicture = pictures && pictures.length;
  return (
    <StyledCharacter component={animated.div} onClick={() => console.log("hello!")} x={x} isSelected={isSelected}>
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
          <NavLink to={formatRoute(CHARACTER_SLUG, { character: character.slug })}>
            <StyledButton component={animated.button} opacity={opacity} y={y}>
              {"See more"}
            </StyledButton>
          </NavLink>
        )}
      </Spring>
    </StyledCharacter>
  );
}
