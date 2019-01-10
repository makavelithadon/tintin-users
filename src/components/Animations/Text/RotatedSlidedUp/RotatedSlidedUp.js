import React from "react";
import { Keyframes } from "react-spring";
import { easeSinOut } from "d3-ease";

const AnimatedLinksLetter = Keyframes.Trail({
  enter: [
    {
      o: 1,
      y: 0,
      from: { o: 0, y: 100 },
      config: key => ({
        clamp: true,
        duration: key === "o" ? 500 : 700,
        easing: easeSinOut,
        delay: 300
      })
    }
  ],
  leave: [{ o: 0, y: 100, config: { easing: easeSinOut, clamp: true, duration: 500 } }]
});

const RotatedSlidedUpText = ({ text, animationState, children, ...rest }) => {
  return (
    <AnimatedLinksLetter
      items={text.split("").map((letter, index) => ({
        letter: letter === " " ? <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }} /> : letter,
        index
      }))}
      keys={item => `${item.letter}-${item.index}`}
      state={animationState}
      {...rest}
    >
      {item => props => children(item)(props)}
    </AnimatedLinksLetter>
  );
};

RotatedSlidedUpText.defaultProps = {
  text: "Oops! No text was passed to the Component!",
  native: true,
  reverse: true,
  animationState: "enter",
  children: item => props => {
    console.log("item", item, "props", props);
    return "hello";
  }
};

export default RotatedSlidedUpText;
