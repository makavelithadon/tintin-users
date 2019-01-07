import { css } from "styled-components";

export function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

export function fillSizes(position = "absolute") {
  return `
    position: ${position};
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100%; height: 100%;
  `;
}

export function center(position = "both") {
  let styles;
  switch (position) {
    case "vertical":
      styles = `
        top: 50%;
        transform: translateY(-50%);
      `;
      break;
    case "horizontal":
      styles = `
        left: 50%;
        transform: translateX(-50%);
        `;
      break;
    case "both":
      styles = `
        left: 50%; top: 50%;
        transform: translate(-50%, -50%);
      `;
      break;
  }
  return `
    position: absolute;
    ${styles}
  `;
}

export function clearfix() {
  return `
    *zoom: 1;
    &:before, &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
  `;
}

export function hardwareAcceleration({ x = 0, y = 0, z = 0 } = {}) {
  return `
    transform: translate3d(${x}, ${y}, ${z});
    backface-visibility: hidden;
    perspective: 1000;
  `;
}

export function backgroundCover(url, { position = "center center", attachment = "initial" } = {}) {
  return `
    background: url(${url});
    background-repeat no-repeat;
    background-position: ${position};
    background-attachment: ${attachment};
    background-size: cover;
  `;
}

export function inheritComponent(component, props, rules = ``) {
  return css`
    ${component.componentStyle.rules.reduce((acc, rule) => {
      return acc + (typeof rule === "function" ? rule(props) : rule);
    }, ``) + rules}
  `;
}
