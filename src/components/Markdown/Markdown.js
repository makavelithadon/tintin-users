import React from "react";
import Markdown from "markdown-to-jsx";
import overrides from "./renderers";

export default function SimpleMarkdown({ content }) {
  return <Markdown options={{ overrides }}>{content}</Markdown>;
}
