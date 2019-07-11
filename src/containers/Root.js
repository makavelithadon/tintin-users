import { connect } from "react-redux";
import { getTheme } from "state/ducks/theme/selectors";
import Root from "Root";

const mapStateToProps = state => ({
  theme: getTheme(state)
});

export default connect(mapStateToProps)(Root);
