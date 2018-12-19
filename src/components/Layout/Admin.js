import React from "react";
import styled, { withTheme } from "styled-components";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { AuthenticatedRoute } from "react-router-util";
import { AdminLogin as Login } from "views";
import { NoMatch } from "views";
import auth from "auth";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
`;

const List = props => <div>List of all users</div>;

function Admin() {
  return (
    <StyledMain>
      <Switch>
        <Redirect exact from={"/admin"} to={"/admin/login"} />
        <Route path="/admin/login" component={Login} />
        <Route
          path="/admin/logout"
          render={() => {
            auth.logout();
            return <Redirect to={"/admin/login"} />;
          }}
        />
        <AuthenticatedRoute
          path="/admin/list"
          isAuthenticated={auth.isLogged()}
          component={List}
          loginPath={"/admin/login"}
        />
        <Route component={NoMatch} />
      </Switch>
    </StyledMain>
  );
}

export default withRouter(withTheme(Admin));
