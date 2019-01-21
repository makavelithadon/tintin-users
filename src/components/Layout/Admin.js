import React from "react";
import styled, { withTheme } from "styled-components";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { AuthenticatedRoute } from "react-router-util";
import { AdminLogin as Login, NoMatch } from "views";
import Logout from "containers/Logout";
import auth from "auth";
import { ADMIN, ADMIN_LOGIN, ADMIN_LOGOUT, ADMIN_PROFILE } from "routes";
import SnackBar from "components/SnackBar";
import SideBar from "components/Admin/SideBar";
import { connect } from "react-redux";
import { getAuth } from "state/ducks/auth/selectors";
import { showLoginDialog } from "state/ducks/auth/actions";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Characters = props => <div>List all characters</div>;

function Admin({ history, auth: { showLoginDialog, data }, hideLoginDialog }) {
  return (
    <StyledMain>
      {auth.isLogged() && (
        <SideBar
          links={[{ displayName: "Profil", slug: "profile" }, { displayName: "Personnages", slug: "characters" }]}
        />
      )}
      {auth.isLogged() && <button onClick={() => history.replace(ADMIN_LOGOUT)}>Logout</button>}
      {auth.isLogged() && (
        <SnackBar show={showLoginDialog} onClose={hideLoginDialog}>
          Bienvenue {data.email}
        </SnackBar>
      )}
      <Switch>
        <Redirect exact from={ADMIN} to={ADMIN_LOGIN} />
        <Route
          path={ADMIN_LOGIN}
          render={props => (auth.isLogged() ? <Redirect to={ADMIN_PROFILE} /> : <Login {...props} />)}
        />
        <Route path={ADMIN_LOGOUT} component={Logout} />
        <AuthenticatedRoute
          path={ADMIN_PROFILE}
          isAuthenticated={auth.isLogged()}
          component={props => (
            <div>
              {data.id} {data.email}
            </div>
          )}
          loginPath={ADMIN_LOGIN}
        />
        <AuthenticatedRoute
          path={"/admin/characters"}
          isAuthenticated={auth.isLogged()}
          component={Characters}
          loginPath={ADMIN_LOGIN}
        />
        <Route component={NoMatch} />
      </Switch>
    </StyledMain>
  );
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

const mapDispatchToProps = dispatch => ({
  hideLoginDialog: () => dispatch(showLoginDialog(false))
});

Admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);

export default withRouter(withTheme(Admin));
