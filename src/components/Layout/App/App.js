import React, { useEffect } from "react";
import styled, { withTheme } from "styled-components";
import { Route, Switch, withRouter } from "react-router-dom";
import { Home, Intro } from "views";
import Character from "containers/Character";
import { scrollToTop } from "utils";
import { HOME, CHARACTER_SLUG } from "routes";
import Nav from "./Nav";

const showIntro = false;

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
`;

const StyledContent = styled.section`
  position: relative;
`;

function Layout({ theme, children, location }) {
  useEffect(() => {
    scrollToTop();
  }, [location]);
  return (
    <StyledMain>
      <StyledContent>
        <Switch>
          <Route
            exact
            path={HOME}
            render={props => {
              const Comp = showIntro ? Intro : Home;
              return <Comp {...props} />;
            }}
          />
          <Route
            exact
            path={CHARACTER_SLUG}
            render={props => (
              <>
                <Nav />
                <Character {...props} />
              </>
            )}
          />
        </Switch>
      </StyledContent>
    </StyledMain>
  );
}

export default withRouter(withTheme(Layout));
