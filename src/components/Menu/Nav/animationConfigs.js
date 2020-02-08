import { Keyframes } from "react-spring";
import { easeSinOut } from "d3-ease";

const nav = {
  common: { duration: 400 },
  enter: { easing: easeSinOut },
  leave: key => ({ delay: 750, easing: easeSinOut })
};

export const AnimatedNav = Keyframes.Spring({
  enter: [
    {
      o: 1,
      slide: 0,
      from: { o: 0, slide: -100 },
      config: { ...nav.common, ...nav.enter }
    }
  ],
  leave: [
    { o: 0, slide: -100, config: key => ({ ...nav.common, ...nav.leave(key) }) }
  ]
});
