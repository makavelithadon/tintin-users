import React from "react";
import styled from "styled-components";
import PictureCaption from "../PictureCaption";

const StyledPictureCaptionContainer = styled.div.attrs(({ top }) => ({
  style: {
    top
  }
}))`
  position: absolute;
  width: 100%;
  transition: ${({ theme }) => theme.transitions.primary};
`;

const Caption = ({ top, caption }) => (
  <StyledPictureCaptionContainer top={top}>
    <PictureCaption caption={caption} />
  </StyledPictureCaptionContainer>
);

export default Caption;
