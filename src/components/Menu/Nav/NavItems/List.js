import React, { useEffect, useState } from "react";
import NavItem from "./Item";
import { withRouter } from "react-router-dom";

function getCurrentSelectedCharacter(list, characterSlug) {
  if (!characterSlug) {
    return null;
  }
  const found = list.find(character => character.slug === characterSlug);
  return found ? found.id : null;
}

function useURLCharacter({ location, list, match }) {
  const [currentId, setCurrentId] = useState(
    getCurrentSelectedCharacter(list, match.params.character)
  );
  useEffect(
    () =>
      setCurrentId(getCurrentSelectedCharacter(list, match.params.character)),
    [location.pathname]
  );
  return currentId;
}

function List({ isNavOpen, list, location, match, ...restProps }) {
  const currentId = useURLCharacter({ location, list, match });
  const [isHoverable, setIsHoverable] = useState(true);

  useEffect(() => setIsHoverable(isNavOpen), [isNavOpen]);

  return list.map(character => (
    <NavItem
      key={character.id}
      item={character}
      isActive={currentId === character.id}
      isHoverable={isHoverable}
      isNavOpen={isNavOpen}
      {...restProps}
    />
  ));
}

export default withRouter(List);
