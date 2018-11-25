import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "components/App";
import Main from "./components/Main";
// import ToggleButton from "./ToggleMenuPosition";

function App() {
  return (
    <Router>
      <AppProvider>
        {/* <ToggleButton>click me!</ToggleButton> */}
        <Main />
      </AppProvider>
    </Router>
  );
}

export default App;
