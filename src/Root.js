import React from "react";
import { createGlobalStyle, ThemeProvider, css } from "styled-components";
import normalizeCSS from "normalize.css";
import theme from "./theme/index";
import App from "./App";
import { getGoogleFonts } from "utils";

// Fonts imports

import BebasBoldEOT from "./assets/fonts/BebasNeueBold.eot?#iefix";
import BebasBoldTTF from "./assets/fonts/BebasNeueBold.ttf";
import BebasBoldWOFF from "./assets/fonts/BebasNeueBold.woff";
import BebasBoldSVG from "./assets/fonts/BebasNeueBold.svg";

const GlobalStyle = createGlobalStyle`
  ${normalizeCSS}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    font-size: .625em; /* fallback IE8+ */
    font-size: calc(1em * .625); /* IE9-IE11 math fixing. See http://bit.ly/1g4X0bX */
  }
  body {
    margin: 0;
    font-family: 'Roboto Condensed', sans-serif;
    -webkit-font-smoothing: antialiased!important;
    font-size: 1.6em; /* base font-size is equivalent "14px" */
    /* overflow: hidden; */
    background-color: ${theme.colors.background};
  }
  ul, li {
    list-style-type: none;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: "Bebas Bold";
    src: local('Bebas Bold'), local('Bebas Bold'),
      url(${BebasBoldEOT}) format('embedded-opentype'), /* IE6-IE8 */
      url(${BebasBoldTTF}) format('woff'), /* Modern Browsers */
      url(${BebasBoldWOFF}) format('truetype'), /* Safari, Android, iOS */
      url(${BebasBoldSVG}) format('svg');
  }
  :root {
    ${Object.entries(theme.colors)
      .reduce((acc, [name, value]) => [...acc, css`--${name}-color: ${value};`], [])
      .flat()}
    ${getGoogleFonts()
      .reduce((acc, font, index) => [...acc, css`--font-${index + 1}: ${font};`], [])
      .flat()}
  }
`;

const Root = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </>
  );
};

export default Root;
