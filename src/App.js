import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root from "Root";
import StoreProvider from "state/store";
import { App as AppLayout, Admin as AdminLayout } from "components/Layout";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Root>
          <Switch>
            <Route path="/admin" component={AdminLayout} />
            <Route path="/" component={AppLayout} />
          </Switch>
        </Root>
      </Router>
    </StoreProvider>
  );
}

export default App;
