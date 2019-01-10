import { Keyframes } from "react-spring";
import { easeSinOut, easeCubicInOut } from "d3-ease";

const nav = {
  common: { duration: 450 },
  enter: { easing: easeSinOut },
  leave: key => ({ delay: key === "o" ? 650 : 550, easing: easeSinOut })
};

const links = {
  common: { clamp: true, duration: 350, easing: easeCubicInOut },
  enter: { delay: 650 },
  leave: { delay: 150 }
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
  leave: [{ o: 0, slide: -100, config: key => ({ ...nav.common, ...nav.leave(key) }) }]
});

export const AnimatedLinks = Keyframes.Trail({
  enter: [
    {
      o: 1,
      rotate: 0,
      y: 0,
      from: { o: 0, rotate: 1, y: 8 },
      config: key => {
        const conf = { ...links.common, ...links.enter };
        if (key === "rotate") conf.duration = 400;
        return conf;
      }
    }
  ],
  leave: [{ o: 0, rotate: 1, y: 8, config: { ...links.common, ...links.leave } }]
});
