import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import Media from "react-media";
import { CHARACTER } from "routes";
import { media } from "utils";
import { fillSizes } from "style-utils";
import CharacterListItem from "./ListItem";
import CollapsiblePanels from "components/CollapsiblePanels";

const StyledContainer = styled.div`
  ${media.medium`max-width: 90vw;`}
  margin: 0 auto;
  height: 40vh;
  ${fillSizes()}
`;

function CharactersList({ characters, history, theme }) {
  return (
    <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
      {matches =>
        matches ? (
          <StyledContainer>
            <CollapsiblePanels>
              {characters.map(character => (
                <CharacterListItem
                  count={characters.length}
                  character={character}
                  key={character.displayName}
                  onSelect={() => history.push(formatRoute(CHARACTER, { character: character.slug }))}
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
