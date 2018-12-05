import React, { useState, useEffect } from "react";
import { useWindowScrollPosition as useScroll, useWindowSize } from "the-platform";
import { isOldBrowser } from "utils";

const Scrolled = React.forwardRef(({ wrapper: Wrapper, children }, ref) => {
  const scrollerDefaultClassName = "scrolled-container";
  const { y: scrollY } = useScroll({ throttleMs: isOldBrowser() ? 20 : 1 });
  const { width: windowWidth, height: windowHeight } = useWindowSize({ throttleMs: isOldBrowser() ? 20 : 1 });
  const [{ isOverflow, isOverTop, isOverBottom, offsetTop }, setState] = useState({
    isOverflow: true,
    isOverTop: true,
    isOverBottom: false,
    offsetTop: 0
  });
  useEffect(
    () => {
      const { current: node } = ref;
      const { height, top } = node.getBoundingClientRect();
      const isOverTop = top > 0;
      const isOverBottom = height + top - windowHeight < 0;
      setState({
        isOverflow: isOverBottom || isOverTop,
        offsetTop: top,
        isOverBottom,
        isOverTop
      });
    },
    [windowWidth, windowHeight, scrollY]
  );

  const state = {
    scrollY,
    windowWidth,
    windowHeight,
    isOverflow,
    isOverTop,
    isOverBottom,
    offsetTop,
    scrollerWidth: ref.current ? ref.current.clientWidth : 0
  };

  const UI = Wrapper ? (
    <Wrapper ref={ref}>{children(state)}</Wrapper>
  ) : (
    <div className={scrollerDefaultClassName} ref={ref}>
      {children(state)}
    </div>
  );

  return UI;
});

export default Scrolled;
