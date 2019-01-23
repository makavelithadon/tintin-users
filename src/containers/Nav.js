import { connect } from "react-redux";
import Nav from "components/Menu/Nav";
import { toggleTheme } from "state/ducks/theme/actions";
import { fetchCharacters } from "state/ducks/characters/actions";
import { getCharacters } from "state/ducks/characters/selectors";

const mapStateToProps = state => ({
  characters: getCharacters(state)
});

const mapDispatchToProps = dispatch => ({
  toggleTheme: () => dispatch(toggleTheme()),
  fetchCharacters: () => dispatch(fetchCharacters())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
