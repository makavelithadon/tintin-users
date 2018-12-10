import React from "react";
import styled, { withTheme } from "styled-components";
import ScrollHandler from "components/ScrollHandler";
import { useStore } from "hooks";

const StyledSlider = styled.section`
  position: relative;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
`;

function Slider({ theme }) {
  const [state, dispatch] = useStore();
  function handleScroll({ refTop, height, isOverTop }) {
    const distance = refTop - height + parseInt(theme.styles.sidebar.paddingBottom, 10);
    const isSecondarySidebarEmailAddress = distance < 0;
    if (isSecondarySidebarEmailAddress) {
      //console.log("distance", distance);
    } else {
      //console.log("not overflowed yet");
    }
    //console.log("isOverTop", isOverTop, "refTop", refTop);
  }
  return (
    <ScrollHandler ref={React.createRef()} wrapper={StyledSlider} onScroll={handleScroll}>
      {({ refTop, height }) => {
        return <div>Hello</div>;
      }}
    </ScrollHandler>
  );
}

export default withTheme(Slider);
