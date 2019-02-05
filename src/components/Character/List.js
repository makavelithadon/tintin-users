import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import Media from "react-media";
import { CHARACTER_SLUG } from "routes";
import { media } from "utils";
import { fillSizes } from "style-utils";
import CharacterListItem from "./ListItem";
import CollapsiblePanels from "components/CollapsiblePanels";
import { H1 } from "UI/Heading";
import $ from "jquery";

$("body").on("click", function() {
  console.log("click from jQuery");
});

const backup = characters => (
  <CollapsiblePanels growRatio={1.5}>
    {characters.map(character => (
      <Link key={character.displayName} to={formatRoute(CHARACTER_SLUG, { character: character.slug })}>
        <CharacterListItem count={characters.length} character={character} onSelect={() => {}} />
      </Link>
    ))}
  </CollapsiblePanels>
);

const StyledContainer = styled.div`
  margin: 0 auto;
  ${fillSizes()};
  position: relative;
  /*display: flex;
  align-items: center;*/
  ${media.small`height: 42vh;`}
  white-space: nowrap;
`;

const sliderWidth = 80;

const StyledSlider = styled.div`
  width: ${sliderWidth}%;
  height: 100%;
  margin: 0 auto;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${(100 - sliderWidth) / 2}%;
    height: 100%;
  }
  &::before {
    left: 0;
    background: ${({ theme }) =>
      `linear-gradient(to right, ${theme.colors.background} 80%, rgba(255, 255, 255, 0) 100%);`};
  }
  &::after {
    right: 0;
    height: 100%;
    background: ${({ theme }) =>
      `linear-gradient(to left, ${theme.colors.background} 80%, rgba(255, 255, 255, 0) 100%);`};
  }
`;

const slideWidth = 190;
const factoreScale = 1.6;

const StyledCharacter = styled.li`
  display: inline-flex;
  width: ${slideWidth}px;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 7px;
  /*box-shadow: ${({ theme }) => theme.shadows.box2};*/
  /*border: 1px solid ${({ theme }) => theme.colors.lighterGrey};*/
  transition: .5s ease-out;
  white-space: normal;
  &:not(:last-child) {
    /* margin-right: 15px; */
  }
  &:hover {
    width: ${slideWidth * factoreScale}px;
  }
`;

const StyledCharacterDisplayName = styled(H1)`
  font-size: 2rem !important;
  text-transform: uppercase;
  max-width: ${slideWidth}px;
`;

function CharactersList({ characters, theme }) {
  const slideLength = 250;
  return (
    <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
      {matches =>
        matches ? (
          <StyledContainer>
            <>
              {/* <StyledSlider>
                {characters.map(character => (
                  <StyledCharacter key={character.displayName}>
                    <StyledCharacterDisplayName>{character.displayName}</StyledCharacterDisplayName>
                  </StyledCharacter>
                ))}
              </StyledSlider> */}
              <StyledSlider>
                <CollapsiblePanels width={characters.length * slideLength} growRatio={1.7}>
                  {characters.map(character => (
                    <Link key={character.displayName} to={formatRoute(CHARACTER_SLUG, { character: character.slug })}>
                      <CharacterListItem count={characters.length} character={character} onSelect={() => {}} />
                    </Link>
                  ))}
                </CollapsiblePanels>
              </StyledSlider>
            </>
          </StyledContainer>
        ) : null
      }
    </Media>
  );
}

export default withRouter(withTheme(CharactersList));
