import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Nav from "components/Menu/Nav";
import { toggleTheme } from "state/ducks/theme/actions";
import { fetchCharacters } from "state/ducks/characters/actions";
import { getCharacters } from "state/ducks/characters/selectors";

const mapStateToProps = state => ({
  characters: getCharacters(state)
});

const actionCreators = dispatch =>
  bindActionCreators(
    {
      toggleTheme,
      fetchCharacters
    },
    dispatch
  );

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
