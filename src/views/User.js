import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import Markdown from "components/Markdown/Markdown";
import { Spring } from "react-spring";
import { easeSinOut } from "d3-ease";
import data from "data/index";
import ScrolledPictures from "components/ScrolledPictures";
import Slider from "components/Slider/Slider";
import Description from "components/Description";
import * as Heading from "UI/Heading";
import { media } from "utils";

const StyledUserContainer = styled.div`
  display: flex;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 15vh;
  min-height: 100vh;
  ${media.forEach({ xs: "100%", medium: "90%", large: "80%" }, w => `width: ${w};`)};
  ${media.forEach({ xs: "30px", small: "50px", medium: "80px" }, paddingRight => `padding-right: ${paddingRight};`)};
  ${({ theme }) => {
    const { xs, ...otherSizes } = theme.styles.sidebar.width;
    return media.forEach(
      {
        xs: "30px",
        ...Object.entries(otherSizes).reduce(
          (styles, [breakpoint, paddingLeft]) => ({
            ...styles,
            [breakpoint]: breakpoint === "small" ? `${parseInt(paddingLeft, 10) + 30}px` : paddingLeft
          }),
          {}
        )
      },
      p => `padding-left: ${p};`
    );
  }};
  padding-bottom: 20vh;
`;

function User({ theme, location }) {
  const user = data.users.find(user => location.pathname.includes(user.slug));
  return (
    <Spring
      from={{ o: 0, x: -101 }}
      to={{ o: 1, x: 0 }}
      config={{ duration: 600, delay: 800, easing: easeSinOut }}
      native
    >
      {props => (
        <>
          <StyledUserContainer>
            {/* descriptionError && descriptionError */}
            {user.description && (
              <>
                <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
                  {matches =>
                    matches && user.pictures && user.pictures.length ? (
                      <ScrolledPictures {...props} pictures={user.pictures} altText={user.displayName} />
                    ) : null
                  }
                </Media>
                <Description {...props} description={<Markdown content={user.description} />}>
                  <Heading.H1 color={"primary"} uppercase>
                    {user.displayName}
                  </Heading.H1>
                </Description>
              </>
            )}
          </StyledUserContainer>
          <Slider />
        </>
      )}
    </Spring>
  );
}

export default withTheme(User);
