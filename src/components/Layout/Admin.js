import React from "react";
import styled, { withTheme } from "styled-components";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Login from "views/Admin/Login";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
`;

function Admin() {
  return (
    <StyledMain>
      <Switch>
        <Redirect exact from={"/admin"} to={"/admin/login"} />
        <Route path="/admin/login" component={Login} />
      </Switch>
    </StyledMain>
  );
}

export default withRouter(withTheme(Admin));
