import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import { Redirect } from "react-router-dom";
import ScrolledPictures from "components/ScrolledPictures";
import Slider from "components/Slider/Slider";
import Description from "components/Description/index";
import { media } from "utils";
import { NOT_FOUND } from "routes";

const StyledCharacterContainer = styled.div`
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
            [breakpoint]:
              breakpoint === "small"
                ? `${parseInt(paddingLeft, 10) + 30}px`
                : breakpoint === "medium"
                ? `${parseInt(paddingLeft, 10) / 2}px`
                : paddingLeft
          }),
          {}
        )
      },
      p => `padding-left: ${p};`
    );
  }};
  padding-bottom: 20vh;
`;

function Character({ theme, location, character }) {
  if (!character) return <Redirect to={NOT_FOUND} />;
  const hasPictures = character.pictures && character.pictures.length;
  const hasDescription = character.description;
  return (
    <>
      <StyledCharacterContainer>
        <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
          {matches => {
            const show = matches && hasPictures;
            return show && <ScrolledPictures pictures={character.pictures} altText={character.displayName} />;
          }}
        </Media>
        {hasDescription && <Description character={character} />}
      </StyledCharacterContainer>
      <Slider />
    </>
  );
}

export default withTheme(Character);
