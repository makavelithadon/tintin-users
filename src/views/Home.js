import React from "react";
import styled from "styled-components";
import { media } from "utils";
import CharactersList from "containers/CharactersList";

const StyledPage = styled.div`
  position: relative;
  min-height: 100vh;
`;

export default function Home() {
  return (
    <StyledPage>
      <CharactersList />
    </StyledPage>
  );
}
