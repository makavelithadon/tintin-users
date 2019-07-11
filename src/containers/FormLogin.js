import { connect } from "react-redux";
import FormLogin from "components/FormLogin/FormLogin";
import { login } from "state/ducks/auth/actions";
import { getAuth } from "state/ducks/auth/selectors";

const mapStateToProps = state => ({
  auth: getAuth(state)
});

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormLogin);
