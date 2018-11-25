import { css } from "styled-components";
import sizes from "theme/sizes";

const {
  breakpoints: { values: breakpoints, order: breakpointsOrder }
} = sizes;

export const forEach = (obj, cb) =>
  Object.entries(obj)
    .reduce((acc, [breakpoint, value]) => {
      acc.push(media[breakpoint]`${cb(value, breakpoint)}`);
      return acc;
    }, [])
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
