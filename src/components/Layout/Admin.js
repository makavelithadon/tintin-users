import React from "react";
import styled, { withTheme } from "styled-components";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { AuthenticatedRoute } from "react-router-util";
import { formatRoute } from "react-router-named-routes";
import { AdminLogin as Login } from "views";
import { NoMatch } from "views";
import auth from "auth";
import { ADMIN, ADMIN_LOGIN, ADMIN_LOGOUT } from "routes";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
`;

const List = props => <div>List of all users</div>;

function Admin() {
  return (
    <StyledMain>
      <Switch>
        <Redirect exact from={ADMIN} to={"/admin/login"} />
        <Route path={ADMIN_LOGIN} component={Login} />
        <Route
          path={ADMIN_LOGOUT}
          render={() => {
            auth.logout();
            return <Redirect to={ADMIN_LOGIN} />;
          }}
        />
        <AuthenticatedRoute
          path="/admin/list"
          isAuthenticated={auth.isLogged()}
          component={List}
          loginPath={ADMIN_LOGIN}
        />
        <Route component={NoMatch} />
      </Switch>
    </StyledMain>
  );
}

export default withRouter(withTheme(Admin));
