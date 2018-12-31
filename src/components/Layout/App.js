import React, { useEffect } from "react";
import styled, { withTheme } from "styled-components";
import { Route, Switch, withRouter } from "react-router-dom";
import Media from "react-media";
import Menu from "components/Menu";
import Header from "components/Header";
import { Home, Character } from "views";
import { scrollToTop } from "utils";
import { HOME, CHARACTER } from "routes";
import patternPicture from "assets/img/pattern.jpg";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
  transition: ${props => props.theme.transitions.primary};
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
  const page = typeof children === "function" ? children() : children;
  return (
    <StyledMain>
      <Menu>
        <Menu.Nav />
        <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
          {matches => (matches ? <Menu.Sidebar /> : <Header />)}
        </Media>
      </Menu>
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
