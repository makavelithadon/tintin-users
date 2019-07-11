import { css } from "styled-components";
import theme from "theme";
import { UserAgent } from "shared";

const {
  breakpoints: { values: breakpoints, order: breakpointsOrder }
} = theme;

export const forEach = (obj, cb) =>
  flat(
    Object.entries(obj).reduce(
      (acc, [breakpoint, value]) => [
        ...acc,
        media[breakpoint]`${cb(value, breakpoint)}`
      ],
      []
    )
  );

export const getHigherFromBreakpoints = obj => {
  for (const br of [...breakpointsOrder].reverse()) {
    if (obj[br]) {
      return obj[br];
    }
  }
};

const initial = { forEach, getHigherFromBreakpoints };

export const media = Object.entries(breakpoints).reduce(
  (acc, [name, width]) => {
    acc[name] = (...args) => css`
      @media (min-width: ${width}) {
        ${css(...args)}
      }
    `;

    return acc;
  },
  initial
);

export const isDev = Boolean(process.env.NODE_ENV === "development");

export function getGoogleFonts() {
  const links = [
    ...document.documentElement.querySelectorAll('head link[rel="stylesheet"]')
  ].filter(link => link.href.includes("fonts.googleapis.com"));

  if (links.length) {
    let normalizedFonts = flat(
      links.map(link => {
        const { href } = link;
        return href.slice(href.indexOf("=") + 1).split("|");
      })
    ).map(font => font.replace(/\+/g, " "));
    return (normalizedFonts = [...new Set(normalizedFonts)]);
  }
}

export function getSquareDiagonal(side) {
  return side * Math.sqrt(2);
}

export function scrollToTop(behavior = "smooth", block = "start") {
  document.documentElement.scrollIntoView({ behavior, block });
}

function normalizeBrowserName(browserName) {
  return browserName.toLowerCase();
}

export function getBrowser() {
  return UserAgent.getBrowser();
}

export function isOldBrowser() {
  const oldBrowsersRegExp = /edge|ie/i;
  return oldBrowsersRegExp.test(normalizeBrowserName(getBrowser().name));
}

export function matchBrowser(pattern) {
  new RegExp(pattern).test(getBrowser().name);
}

export function flat(...args) {
  return Array.prototype.flat.call(...args);
}

export function throttle(func, threshhold = 250, scope) {
  let last, deferTimer;
  return function(c) {
    let context = scope || c;
    let now = Date.now(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        func.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
}

export function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function uppercasify(str) {
  return str.toUpperCase();
}

export function lowercasify(str) {
  return str.toLowerCase();
}

export function keepOnlyNotUndefinedValues(arr) {
  return arr.filter(x => typeof x !== "undefined");
}

export function stripUnits(someValueWithUnits) {
  return parseInt(someValueWithUnits, 10);
}

export function filterObjectByKey(obj, keyString, exact = true) {
  return Object.keys(obj)
    .filter(key => (exact ? key === keyString : key.includes(keyString)))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

export function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function toArray(arrayLike) {
  return [...arrayLike];
}

export function getCSSProperty(el, prop) {
  return window.getComputedStyle(el).getPropertyValue(prop);
}

export function isValidDOMAttribute(attrLike, DOMElement) {
  return DOMElement && attrLike in document.createElement(DOMElement);
}

export function getDeepKey(obj, path) {
  return path.split(".").reduce((acc, key) => acc[key], obj);
}
