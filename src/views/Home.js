import React from "react";
import styled from "styled-components";
import { css } from "styled-components/macro";
// import CharactersList from "containers/CharactersList";

const StyledPage = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

/* const StyledSkewed = styled.div`
  position: fixed;
  z-index: 0;
  width: 50vw;
  top: 50%;
  transform: translate(-50%, -50%) rotate(19deg);
  left: 10%;
  background-color: var(--primary-color);
  height: 9999px;
`; */

const CIRCLE_SIZE = 200;

const StyledCircle = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

function CircleWrapper({ circle: CircleElement }) {
  return (
    <div
      css={css`
        position: absolute;
        width: ${CIRCLE_SIZE}vh;
        height: ${CIRCLE_SIZE}vh;
        right: 0;
        transform: translateX(calc(${CIRCLE_SIZE}vh / 2));
      `}
    >
      <CircleElement />
    </div>
  );
}

export default function Home() {
  return (
    <StyledPage>
      {/* <StyledSkewed /> */}
      {/* <CharactersList /> */}
      <CircleWrapper circle={StyledCircle} />
    </StyledPage>
  );
}
