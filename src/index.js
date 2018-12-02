import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./polyfills";
import "./shared";
import Root from "./Root";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root");

const render = Element => ReactDOM.render(<Element />, rootElement);

render(Root);

if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
