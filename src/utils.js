import { css } from "styled-components";
import theme from "theme";
import { parser } from "shared";

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

export const isDev = Boolean(
  /* process && process.env && process.env.NODE_env && process.env.NODE_ENV === "development" */ false
);

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

export function scrollToTop() {
  document.documentElement.scrollIntoView({ behavior: "smooth", block: "start" });
}

function normalizeBrowserName(browserName) {
  return browserName.toLowerCase();
}

export function getBrowser() {
  return parser.getBrowser();
}

export function isOldBrowser() {
  return /edge|ie/i.test(normalizeBrowserName(parser.getBrowser().name));
}

export function matchBrowser(pattern) {
  new RegExp(pattern).test(getBrowser().name);
}
