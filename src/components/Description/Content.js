import React from "react";
import Markdown from "components/Markdown/Markdown";

export default function Content({ content }) {
  return (
    <article>
      <Markdown content={content} />
    </article>
  );
}
