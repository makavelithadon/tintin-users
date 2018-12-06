import React from "react";
import { withTheme } from "styled-components";
import Markdown from "components/Markdown";
import Media from "react-media";
import { Spring } from "react-spring";
import { easePolyOut } from "d3-ease";
import data from "data/index";
import ScrolledPictures from "./ScrolledPictures";
import Description from "./Description";
import * as Heading from "UI/Heading";
import { useDescription, useStore } from "hooks";

function User({ theme, location }) {
  const [{ app }, dispatch] = useStore();
  const user = data.users.find(user => location.pathname.includes(user.slug));
  const { description, error: descriptionError } = useDescription(user.description);
  return (
    <Spring
      from={{ o: 0, x: -101 }}
      to={{ o: 1, x: 0 }}
      config={{ duration: 600, delay: 800, easing: easePolyOut }}
      native
    >
      {props => (
        <>
          {descriptionError && descriptionError}
          {description && (
            <>
              <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
                {matches => (matches && user.pictures ? <ScrolledPictures {...props} user={user} /> : null)}
              </Media>
              <Description {...props} description={<Markdown content={description} />}>
                <Heading.H1 color={theme.colors.primary}>{user.displayName}</Heading.H1>
              </Description>
            </>
          )}
        </>
      )}
    </Spring>
  );
}

export default withTheme(User);
