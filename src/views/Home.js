import React from "react";
import styled from "styled-components";
import CharactersList from "containers/CharactersList";

const StyledPage = styled.div`
  position: relative;
  min-height: 100vh;
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

export default function Home() {
  return (
    <StyledPage>
      {/* <StyledSkewed /> */}
      <CharactersList />
    </StyledPage>
  );
}
