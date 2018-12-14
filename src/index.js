import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./polyfills";
import "./shared";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const contentful = require("contentful");

const rootElement = document.getElementById("root");

const render = Element => ReactDOM.render(<Element />, rootElement);

render(App);

if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "za313qvkrq4h",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "a0f7ba0463e8891b63d62c6cd0e85a158512aba14bc44bd2f1eccdd7ef08637d"
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
client
  .getEntry("3yC7yYVC5OS8S6WCQy8mMU")
  .then(entry => console.log(entry))
  .catch(err => console.log(err));
