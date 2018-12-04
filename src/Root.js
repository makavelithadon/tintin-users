import React from "react";
import { createGlobalStyle, ThemeProvider, css } from "styled-components";
import normalizeCSS from "normalize.css";
import theme from "./theme/index";
import App from "./App";
import { getGoogleFonts, flat } from "utils";

// Fonts imports

import BebasBoldEOT from "./assets/fonts/BebasNeueBold.eot?#iefix";
import BebasBoldTTF from "./assets/fonts/BebasNeueBold.ttf";
import BebasBoldWOFF from "./assets/fonts/BebasNeueBold.woff";
import BebasBoldSVG from "./assets/fonts/BebasNeueBold.svg";

import TintinBoldEOT from "./assets/fonts/TintinBold.eot?#iefix";
import TintinBoldTTF from "./assets/fonts/TintinBold.ttf";
import TintinBoldWOFF from "./assets/fonts/TintinBold.woff";
import TintinBoldSVG from "./assets/fonts/TintinBold.svg";

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
      url(${BebasBoldTTF}) format('truetype'), /* Modern Browsers */
      url(${BebasBoldWOFF}) format('woff'), /* Safari, Android, iOS */
      url(${BebasBoldSVG}) format('svg');
  }

  @font-face {
    font-family: "Tintin Bold";
    src: local('Tintin Bold'), local('Tintin Bold'),
      url(${TintinBoldEOT}) format('embedded-opentype'), /* IE6-IE8 */
      url(${TintinBoldTTF}) format('truetype'), /* Modern Browsers */
      url(${TintinBoldWOFF}) format('woff'), /* Safari, Android, iOS */
      url(${TintinBoldSVG}) format('svg');
  }
  :root {
    ${flat(Object.entries(theme.colors).reduce((acc, [name, value]) => [...acc, css`--${name}-color: ${value};`], []))}
    ${flat(getGoogleFonts().reduce((acc, font, index) => [...acc, css`--font-${index + 1}: ${font};`], []))}
  }
`;

const Root = props => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App {...props} />
      </ThemeProvider>
    </>
  );
};

export default Root;
