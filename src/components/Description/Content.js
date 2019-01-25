import React from "react";
import Markdown from "components/Markdown/Markdown";
import uuid from "uuid";

export default function Content({ content }) {
  return (
    <article>
      <Markdown key={uuid.v4()} content={content} />
    </article>
  );
}
