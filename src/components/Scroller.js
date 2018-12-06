import React, { useState, useEffect } from "react";
import { useWindowScrollPosition as useScroll, useWindowSize } from "the-platform";
import { isOldBrowser } from "utils";

function round(n) {
  return Math.round(n);
}

const Scroller = React.forwardRef(({ wrapper: Wrapper, children }, ref) => {
  const scrollerDefaultClassName = "scrolled-container";
  const { y: scrollY } = useScroll({ throttleMs: isOldBrowser() ? 20 : 0.0001 });
  const { width: windowWidth, height: windowHeight } = useWindowSize({ throttleMs: isOldBrowser() ? 20 : 0.0001 });
  const [{ isOverflow, isOverTop, isOverBottom, offsetTop, scrollerWidth }, setState] = useState({
    isOverflow: true,
    isOverTop: true,
    isOverBottom: false,
    offsetTop: 0,
    scrollerWidth: 0
  });
  useEffect(
    () => {
      const { current: node } = ref;
      const { height, top } = node.getBoundingClientRect();
      const isOverTop = top > 0;
      const isOverBottom = round(height) + round(top) - round(windowHeight) < 0;
      setState({
        isOverflow: isOverBottom || isOverTop,
        offsetTop: top,
        isOverBottom,
        isOverTop,
        scrollerWidth: node.clientWidth
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
    scrollerWidth
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

export default Scroller;
