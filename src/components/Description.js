import React from "react";
import styled, { withTheme } from "styled-components";
import { animated } from "react-spring";
import faker from "faker";
import { H1 } from "UI/Heading";
import { media } from "utils";

const StyledDescription = styled(animated.div).attrs(({ x, o }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: x.interpolate(x => `translateY(${-x}px)`)
  }
}))`
  color: ${({ theme }) => theme.colors.darkGrey};
  line-height: 1.4;
  text-align: left;
  padding-top: 15vh;
  ${media.forEach({ xs: "100%", medium: "70%" }, w => `width: ${w};`)};
  ${media.forEach({ xs: 0, medium: "6%" }, paddingLeft => `padding-left: ${paddingLeft};`)};
`;

const StyledParagraph = styled.p`
  margin-top: 0;
  margin-bottom: 4rem;
  font-family: ${({ theme }) => theme.fonts.tertiary};
`;

function Description(props) {
  const { theme, user, ...rest } = props;
  return (
    <StyledDescription {...rest}>
      <H1 color={theme.colors.primary}>{user.displayName}</H1>
      {[...new Array(15)].map((_, index) => (
        <StyledParagraph key={index}>{faker.lorem.paragraphs()}</StyledParagraph>
      ))}
    </StyledDescription>
  );
}

export default withTheme(Description);
