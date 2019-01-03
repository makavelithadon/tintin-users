import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCharacters } from "state/ducks/characters/selectors";
import { fetchCharacters } from "state/ducks/characters/actions";
import List from "components/Character/List";
import Loader from "UI/Loader";

function CharactersList({ characters: { items: characters, isLoading, error }, fetchCharacters }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      fetchCharacters();
    }
  });
  //setS(false);
  let ui = null;
  if (!mounted) return null;
  if (error) {
    ui = <p>Error: {error.message}</p>;
  } else if (isLoading) {
    ui = <Loader />;
  } else if (!characters.length) {
    ui = <p>No characters to display</p>;
  } else {
    ui = <List characters={characters} />;
  }
  return ui;
}

const mapStateToProps = state => ({ characters: getCharacters(state) });

const mapDispatchToProps = dispatch => ({ fetchCharacters: () => dispatch(fetchCharacters()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersList);
