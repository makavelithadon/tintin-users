import React, { useState, useEffect, memo } from "react";
import styled, { css } from "styled-components";
import { Spring } from "react-spring";
import { useViewport } from "hooks";
import { easeSinOut } from "d3-ease";
import { stripUnits, filterObjectByKey, getCSSProperty } from "utils";

const debug = true;
let debugColors = ["#0ebeff", "#30acf4", "#539be9", "#7589de", "#9877d4", "#ba65c9", "#dd54be", "#ff42b3"];

function debugHelper() {
  return css`
    ${debugColors.reduce(
      (rules, _, index) =>
        rules +
        `
  &:nth-child(${index + 1}) {
    background-color: ${debugColors[index]};
  }
`,
      ``
    )}
  `;
}

const StyledContainer = styled.ul`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  & > * {
    height: 100%;
    ${debug && debugHelper()}
  }
`;

let StyledPanel = styled.li.attrs(({ width, left }) => ({
  style: {
    width,
    left
  }
}))`
  position: absolute;
`;

function getStartAnimations(animations) {
  return filterObjectByKey(animations, "start", false);
}

function getEndAnimations(animations) {
  return filterObjectByKey(animations, "end", false);
}

function flatAnimatedObjectKeys(animationsObject, regExp = /-(start|end)/i) {
  return Object.entries(animationsObject).reduce(
    (acc, [key, value]) => ({ ...acc, [key.replace(regExp, "")]: value }),
    {}
  );
}

function setAnimationsList(list, hoveredIndex, isFirst = false, growRatio) {
  const itemsCount = list.length;
  if (isFirst) {
    return list.reduce(
      (acc, item, index) => ({
        ...acc,
        [`${index}-left-start`]: index * (100 / itemsCount) + "%",
        [`${index}-left-end`]: index * (100 / itemsCount) + "%",
        [`${index}-width-start`]: 100 / itemsCount + "%",
        [`${index}-width-end`]: 100 / itemsCount + "%"
      }),
      {}
    );
  }
  const containerWidth = Math.ceil(stripUnits(getCSSProperty(list[0].parentNode, "width")));
  const hoveredWidth = Math.ceil((containerWidth / itemsCount) * growRatio);
  const unHoveredWidth = Math.ceil((containerWidth - hoveredWidth) / (itemsCount - 1));
  const mergedList = list.map((item, index) => {
    const isHovered = index === hoveredIndex;
    const isBefore = index < hoveredIndex;
    return {
      [`${index}-left-start`]: stripUnits(getCSSProperty(item, "left")),
      [`${index}-width-start`]: stripUnits(getCSSProperty(item, "width")),
      [`${index}-left-end`]: isHovered
        ? index * unHoveredWidth
        : isBefore
        ? stripUnits(index * unHoveredWidth)
        : (index - 1) * unHoveredWidth + hoveredWidth,
      [`${index}-width-end`]: isHovered ? hoveredWidth + 6 : unHoveredWidth + 6
    };
  });
  return { ...mergedList.reduce((acc, item) => ({ ...acc, ...item }), {}) };
}

function CollapsiblePanels({ children, growRatio }) {
  const { width, height } = useViewport();
  const [animations, setAnimations] = useState(setAnimationsList(children, null, true, growRatio));
  const [lastHoveredIndex, setLastHoveredIndex] = useState(0);
  const refs = [];
  useEffect(
    () => {
      setAnimations(setAnimationsList(refs, null, true, growRatio));
    },
    [width, height]
  );
  function onHover(index, resize = false) {
    if (lastHoveredIndex === index && !resize) return;
    setLastHoveredIndex(index);
    setAnimations(setAnimationsList(refs, index, false, growRatio));
  }
  function onLeave() {}
  return (
    <StyledContainer onMouseLeave={onLeave}>
      <Spring
        from={flatAnimatedObjectKeys(getStartAnimations(animations))}
        to={flatAnimatedObjectKeys(getEndAnimations(animations))}
        config={{ easing: easeSinOut, duration: 300 }}
        reset={true}
      >
        {props => {
          return React.Children.map(children, (child, index) => {
            return (
              <StyledPanel
                width={props[`${index}-width`]}
                left={props[`${index}-left`]}
                ref={node => (refs.length < React.Children.count(children) ? refs.push(node) : null)}
                onMouseOver={() => onHover(index)}
              >
                {child}
              </StyledPanel>
            );
          });
        }}
      </Spring>
    </StyledContainer>
  );
}

export default memo(CollapsiblePanels);
