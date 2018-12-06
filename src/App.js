import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StoreProvider from "./Store";
import rootReducer from "./reducers";
import User from "components/User";
import Layout from "components/Layout";
// import ToggleButton from "./ToggleMenuPosition";

function App() {
  return (
    <StoreProvider rootReducer={rootReducer}>
      <Router>
        <Layout>
          <Switch>
            {/* <Route exact path={"/"} render={props => "Hello from Home"} /> */}
            <Route exact path={"/:user"} component={User} />
          </Switch>
        </Layout>
      </Router>
    </StoreProvider>
  );
}

export default App;
