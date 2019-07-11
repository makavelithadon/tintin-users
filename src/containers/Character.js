import { connect } from "react-redux";
import Character from "views/Character";
import { getSelectedCharacter } from "state/ducks/characters/selectors";

const mapStateToProps = (state, { location }) => ({
  character: getSelectedCharacter(state, location.pathname)
});

export default connect(mapStateToProps)(Character);
