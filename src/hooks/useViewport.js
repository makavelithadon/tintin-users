import { useState, useEffect } from "react";

export default function useViewport() {
  const [{ width, height }, setSizes] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  function setSizesHelper() {
    const { innerWidth: width, innerHeight: height } = window;
    setSizes({ width, height });
  }

  useEffect(() => {
    window.addEventListener("resize", setSizesHelper);
    return () => {
      window.removeEventListener("resize", setSizesHelper);
    };
  });

  return { width, height };
}
