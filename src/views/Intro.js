import React from "react";
import styled from "styled-components";
import { backgroundCover } from "style-utils";
import introDraftWallpaper from "assets/img/intro-draft.jpg";

const StyledIntro = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${backgroundCover(introDraftWallpaper)};
  color: ${({ theme }) => theme.colors.white};
`;

export default function Intro() {
  return (
    <StyledIntro>
      <code>Welcome (from Intro.js)</code>
    </StyledIntro>
  );
}
