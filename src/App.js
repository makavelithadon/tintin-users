import React from "react";
import { BrowserRouter as Router } from "react-router-util";
import { Route, Switch } from "react-router-dom";
import Root from "Root";
import StoreProvider from "state/store";
import * as Layout from "components/Layout";
import { NoMatch } from "views";
import { HOME, ADMIN } from "routes";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Root>
          <Switch>
            <Route path={ADMIN} component={Layout.Admin} />
            <Route path={HOME} component={Layout.App} />
            <Route component={NoMatch} />
          </Switch>
        </Root>
      </Router>
    </StoreProvider>
  );
}

export default App;
