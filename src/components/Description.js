import React from "react";
import styled, { withTheme } from "styled-components";
import { media } from "utils";

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  text-align: left;
  min-height: 100vh;
  ${media.forEach({ xs: "100%", medium: "60%" }, w => `width: ${w};`)};
  ${media.forEach({ xs: 0, medium: "6%" }, paddingLeft => `padding-left: ${paddingLeft};`)};
`;

function Description({ theme, description, children }) {
  return (
    <StyledDescription>
      {children && children}
      <article>{description && description}</article>
    </StyledDescription>
  );
}

export default withTheme(Description);
