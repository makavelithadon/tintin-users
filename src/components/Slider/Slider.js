import React from "react";
import styled from "styled-components";

const StyledSlider = styled.section`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export default function Slider() {
  return <StyledSlider />;
}
