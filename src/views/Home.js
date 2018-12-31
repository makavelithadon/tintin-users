import React from "react";
import styled from "styled-components";
import { media } from "utils";
import CharactersList from "containers/CharactersList";

const StyledPage = styled.div`
  position: relative;
  min-height: 100vh;
  padding-top: 15vh;
  padding-bottom: 20vh;
  display: flex;
  align-items: center;
  ${({ theme }) => {
    const { xs, ...otherSizes } = theme.styles.sidebar.width;
    return media.forEach(
      {
        xs: "30px",
        ...Object.entries(otherSizes).reduce(
          (styles, [breakpoint, paddingLeft]) => ({
            ...styles,
            [breakpoint]: breakpoint === "small" ? `${parseInt(paddingLeft, 10) + 30}px` : paddingLeft
          }),
          {}
        )
      },
      p => `padding-left: ${p}; padding-right: ${p};`
    );
  }};
`;

export default function Home() {
  return (
    <StyledPage>
      <CharactersList />
    </StyledPage>
  );
}
