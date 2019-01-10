import { connect } from "react-redux";
import Nav from "components/Menu/Nav/index";
import { toggleTheme } from "state/ducks/theme/actions";

const mapDispatchToProps = dispatch => ({
  toggleTheme: () => dispatch(toggleTheme())
});

export default connect(
  null,
  mapDispatchToProps
)(Nav);
