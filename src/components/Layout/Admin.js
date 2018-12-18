import React from "react";
import styled, { withTheme } from "styled-components";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { AuthenticatedRoute } from "react-router-util";
import Login from "views/Admin/Login";
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
        <AuthenticatedRoute
          path="/admin/list"
          isAuthenticated={auth.isLogged()}
          component={List}
          loginPath={"/admin/login"}
        />
      </Switch>
    </StyledMain>
  );
}

export default withRouter(withTheme(Admin));
