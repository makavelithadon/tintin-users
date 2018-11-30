import { css } from "styled-components";
import theme from "theme";

const {
  breakpoints: { values: breakpoints, order: breakpointsOrder }
} = theme;

export const forEach = (obj, cb) =>
  Object.entries(obj)
    .reduce((acc, [breakpoint, value]) => [...acc, media[breakpoint]`${cb(value, breakpoint)}`], [])
    .flat();

export const getHigherFromBreakpoints = obj => {
  for (const br of [...breakpointsOrder].reverse()) {
    if (obj[br]) {
      return obj[br];
    }
  }
};

const initial = { forEach, getHigherFromBreakpoints };

export const media = Object.entries(breakpoints).reduce((acc, [name, width]) => {
  acc[name] = (...args) => css`
    @media (min-width: ${width}) {
      ${css(...args)}
    }
  `;

  return acc;
}, initial);

export function isDev(env) {
  return env === "development";
}

export function getGoogleFonts() {
  const links = [...document.documentElement.querySelectorAll('head link[rel="stylesheet"]')].filter(link =>
    link.href.includes("fonts.googleapis.com")
  );

  if (links.length) {
    let normalizedFonts = links
      .map(link => {
        const { href } = link;
        return href.slice(href.indexOf("=") + 1).split("|");
      })
      .flat()
      .map(font => font.replace(/\+/g, " "));
    return (normalizedFonts = [...new Set(normalizedFonts)]);
  }
}

export function getSquareDiagonal(side) {
  return side * Math.sqrt(2);
}
