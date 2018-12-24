import React from "react";
import styled, { withTheme } from "styled-components";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { AuthenticatedRoute } from "react-router-util";
import { formatRoute } from "react-router-named-routes";
import { AdminLogin as Login, NoMatch } from "views";
import Logout from "containers/Logout";
import auth from "auth";
import { ADMIN, ADMIN_LOGIN, ADMIN_LOGOUT, ADMIN_PROFILE } from "routes";
import { connect } from "react-redux";
import { getAuth } from "state/ducks/auth/selectors";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
`;

const mapStateToProps = state => ({
  auth: getAuth(state)
});

const Profile = connect(mapStateToProps)(props => (
  <div>
    {props.auth.data.id} {props.auth.data.email}
  </div>
));

function Admin({ history }) {
  return (
    <StyledMain>
      {auth.isLogged() && <button onClick={() => history.replace(ADMIN_LOGOUT)}>Logout</button>}
      <Switch>
        <Redirect exact from={ADMIN} to={ADMIN_LOGIN} />
        <Route path={ADMIN_LOGIN} component={Login} />
        <Route path={ADMIN_LOGOUT} component={Logout} />
        <AuthenticatedRoute
          path={ADMIN_PROFILE}
          isAuthenticated={auth.isLogged()}
          component={Profile}
          loginPath={ADMIN_LOGIN}
        />
        <Route component={NoMatch} />
      </Switch>
    </StyledMain>
  );
}

export default withRouter(withTheme(Admin));
