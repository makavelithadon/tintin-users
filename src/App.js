import React from "react";
import { BrowserRouter as Router } from "react-router-util";
import { Route, Switch } from "react-router-dom";
import Root from "Root";
import StoreProvider from "state/store";
import * as Layout from "components/Layout";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Root>
          <Switch>
            <Route path="/admin" component={Layout.Admin} />
            <Route path="/" component={Layout.App} />
          </Switch>
        </Root>
      </Router>
    </StoreProvider>
  );
}

export default App;
