import React, { useEffect } from "react";
import styled, { withTheme } from "styled-components";
import { Route, Switch, withRouter } from "react-router-dom";
import { Home, Character } from "views";
import { scrollToTop } from "utils";
import { HOME, CHARACTER } from "routes";

/* const ScratchTest = withAnimation({
  component: ({ style: { o, x }, style, children }) => (
    <animated.div style={{ opacity: o.interpolate(o => o), transform: x.interpolate(x => `translateX(${x}px)`) }}>
      {typeof children !== "undefined" && (typeof children === "function" ? children(style) : children)}
    </animated.div>
  ),
  animation: <Spring from={{ o: 0, x: -20 }} to={{ o: 1, x: 0 }} config={config.gentle} native />
}); */

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
          <Route exact path={HOME} component={Home} />
          <Route exact path={CHARACTER} component={Character} />
        </Switch>
      </StyledContent>
    </StyledMain>
  );
}

export default withRouter(withTheme(Layout));
