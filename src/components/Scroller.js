import React, { useState, useEffect } from "react";
import { useWindowScrollPosition as useScroll, useWindowSize } from "the-platform";
import { isOldBrowser, throttle } from "utils";

function round(n) {
  return Math.round(n);
}

let init = false;

const Scroller = React.forwardRef(({ wrapper: Wrapper, children }, ref) => {
  const scrollerDefaultClassName = "scrolled-container";
  const { width: windowWidth, height: windowHeight } = useWindowSize({ throttleMs: isOldBrowser() ? 20 : 1 });
  const [{ isOverflow, isOverTop, isOverBottom, offsetTop, scrollerWidth }, setState] = useState({
    isOverflow: true,
    isOverTop: true,
    isOverBottom: false,
    offsetTop: 0,
    scrollerWidth: 0
  });
  const handleAll = throttle(
    () => {
      if (!ref.current) return;
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
    isOldBrowser() ? 20 : 1
  );
  useEffect(() => {
    /* if (typeof top === "undefined") {
      top = ref.current.getBoundingClientRect().top;
    } */
    if (scrollerWidth === 0) {
      setState({ scrollerWidth: ref.current.clientWidth });
    }
    if (!init && window.pageYOffset === 0) {
      init = true;
      handleAll();
    }
    window.addEventListener("scroll", handleAll);
    window.addEventListener("resize", handleAll);
    return () => {
      window.removeEventListener("scroll", handleAll);
      window.removeEventListener("resize", handleAll);
      //init = false;
    };
  });

  const state = {
    scrollY: window.pageYOffset,
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
