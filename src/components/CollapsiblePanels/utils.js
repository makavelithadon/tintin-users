import { stripUnits, filterObjectByKey, getCSSProperty } from "utils";

export const getStartAnimations = animations => filterObjectByKey(animations, "start", false);

export const getEndAnimations = animations => filterObjectByKey(animations, "end", false);

export const flatAnimatedObjectKeys = (animationsObject, regExp = /-(start|end)/i) =>
  Object.entries(animationsObject).reduce((acc, [key, value]) => ({ ...acc, [key.replace(regExp, "")]: value }), {});

export const setAnimationsList = (list, hoveredIndex, isFirst = false, growRatio) => {
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
};
