import { connect } from "react-redux";
import { AdminLogout as Logout } from "views";
import { logout } from "state/ducks/auth/actions";

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
