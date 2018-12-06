import React from "react";
import * as Markdown from "react-markdown";
import renderers from "./renderers";

export default function SimpleMarkdown({ content }) {
  return <Markdown source={content} escapeHtml={false} renderers={renderers} />;
}
