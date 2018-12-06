import React from "react";
import P from "UI/P";
import * as Heading from "UI/Heading";

function ParagraphRenderer(props) {
  return <P {...props} />;
}

function HeadingRenderer({ level, ...restHeadingProps }) {
  const H = Heading[`H${level}`];
  return <H {...restHeadingProps} />;
}

export default {
  link: props => props.children,
  paragraph: ParagraphRenderer,
  heading: HeadingRenderer
};
