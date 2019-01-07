import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import Media from "react-media";
import { CHARACTER_SLUG } from "routes";
import { media } from "utils";
import { fillSizes } from "style-utils";
import CharacterListItem from "./ListItem";
import CollapsiblePanels from "components/CollapsiblePanels";

const StyledContainer = styled.div`
  margin: 0 auto;
  ${fillSizes()};
  position: relative;
  display: flex;
  align-items: center;
  width: 90vw;
  ${media.medium`height: 50vh;`}
`;

const StyledWrapper = styled.li`
  position: relative;
  display: inline-block;
  height: 100%;
  /*flex-shrink: 0;*/
`;

function CharactersList({ characters, history, theme }) {
  return (
    <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
      {matches =>
        matches ? (
          <StyledContainer>
            <CollapsiblePanels growRatio={1.5}>
              {characters.map(character => (
                <CharacterListItem
                  count={characters.length}
                  character={character}
                  key={character.displayName}
                  onSelect={() => history.push(formatRoute(CHARACTER_SLUG, { character: character.slug }))}
                />
              ))}
            </CollapsiblePanels>
          </StyledContainer>
        ) : null
      }
    </Media>
  );
}

export default withRouter(withTheme(CharactersList));
