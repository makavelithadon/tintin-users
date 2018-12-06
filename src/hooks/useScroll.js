import { useState, useEffect } from "react";

export default function useScroll() {
  const [{ x, y }, setScroll] = useState({
    x: window.pageXOffset,
    y: window.pageYOffset
  });
  const setScrollHelper = () => {
    setScroll({
      x: window.pageXOffset,
      y: window.pageYOffset
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", setScrollHelper);
    return () => {
      window.removeEventListener("scroll", setScrollHelper);
    };
  });
  return { x, y };
}
