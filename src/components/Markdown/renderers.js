import React from "react";
import styled, { withTheme } from "styled-components";
import P from "UI/P";
import * as Heading from "UI/Heading";
import Img from "UI/Img";
import Media from "react-media";

const StyledImg = styled(Img)`
  display: block;
  margin-bottom: 20px;
  max-width: 300px;
`;

const ResponsiveImg = withTheme(({ query, theme, ...rest }) => {
  return (
    <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
      {matches => (matches ? null : <StyledImg {...rest} />)}
    </Media>
  );
});

export default {
  /* link: props => props.children,
  paragraph: ParagraphRenderer,
  heading: HeadingRenderer,
  img: props => {
    console.log("props", props);
    return props.children;
  } */
  p: { component: P },
  h2: { component: Heading.H2 },
  ResponsiveImg: {
    component: ResponsiveImg
  }
};
