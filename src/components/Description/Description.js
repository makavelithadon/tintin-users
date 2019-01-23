import React from "react";
import styled from "styled-components";
import Title from "./Title";
import Content from "./Content";
import { media } from "utils";

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  text-align: left;
  min-height: 100vh;
  ${media.forEach({ xs: "100%", medium: "60%" }, w => `width: ${w};`)};
  ${media.forEach({ xs: 0, medium: "6%" }, paddingLeft => `padding-left: ${paddingLeft};`)};
`;

function Description({ character }) {
  return (
    <StyledDescription>
      <Title title={character.displayName} />
      <Content content={character.description} />
    </StyledDescription>
  );
}

export default Description;
