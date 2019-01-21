import React, { useEffect } from "react";
import styled, { withTheme } from "styled-components";
import { Route, Switch, withRouter } from "react-router-dom";
import { Home, Character, Intro } from "views";
import { scrollToTop } from "utils";
import { HOME, CHARACTER_SLUG } from "routes";

const showIntro = true;

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
`;

const StyledContent = styled.section`
  position: relative;
`;

function Layout({ theme, children, location }) {
  useEffect(
    () => {
      scrollToTop();
    },
    [location]
  );
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
          <Route exact path={CHARACTER_SLUG} component={Character} />
        </Switch>
      </StyledContent>
    </StyledMain>
  );
}

export default withRouter(withTheme(Layout));
