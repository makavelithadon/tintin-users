import React from "react";
import styled from "styled-components";
import P from "UI/P";
import * as Heading from "UI/Heading";
import Img from "UI/Img";
import Media from "react-media";

function ParagraphRenderer(props) {
  return <P {...props} />;
}

function HeadingRenderer({ level, ...restHeadingProps }) {
  const H = Heading[`H${level}`];
  return <H {...restHeadingProps} />;
}

const StyledImg = styled(Img)`
  display: block;
  margin-bottom: 20px;
  max-width: 80%;
`;

const ResponsiveImg = ({ query, ...rest }) => {
  return <Media query={query}>{matches => !!matches && <StyledImg {...rest} />}</Media>;
};

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
