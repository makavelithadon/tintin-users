import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root from "./Root";
import StoreProvider from "./Store";
import rootReducer from "./reducers";
import User from "components/User";
import Layout from "components/Layout/Layout";
// import ToggleButton from "./ToggleMenuPosition";

function App() {
  return (
    <StoreProvider rootReducer={rootReducer}>
      <Router>
        <Root>
          <Layout>
            <Switch>
              <Route exact path={"/"} render={props => "Hello from Home"} />
              <Route exact path={"/:user"} component={User} />
            </Switch>
          </Layout>
        </Root>
      </Router>
    </StoreProvider>
  );
}

export default App;
