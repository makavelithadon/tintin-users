import React from "react";
import { BrowserRouter as Router } from "react-router-util";
import { Route, Switch } from "react-router-dom";
import { INIT_TYPE } from "./constants";
import { Provider } from "react-redux";
import Root from "containers/Root";
import store from "state/store";
import * as Layout from "components/Layout";
import { NoMatch } from "views";
import { HOME, NOT_FOUND, ADMIN } from "routes";

store.dispatch({ type: INIT_TYPE });

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Root>
          <Switch>
            <Route path={ADMIN} component={Layout.Admin} />
            <Route path={NOT_FOUND} component={NoMatch} />
            <Route path={HOME} component={Layout.App} />
            <Route component={NoMatch} />
          </Switch>
        </Root>
      </Router>
    </Provider>
  );
}
