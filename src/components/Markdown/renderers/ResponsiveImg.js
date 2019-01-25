import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import { easeSinOut } from "d3-ease";
// import { CHARACTER_SLUG } from "routes";
import Img from "./Img";
import { inheritComponent } from "style-utils";
import { Spring, animated } from "react-spring";
import uuid from "uuid";
/* import TransitionedComponent from "components/TransitionedComponent";
import Revealer from "components/Revealer"; */

const StyledResponsiveImg = styled(animated.img).attrs(({ opacity }) => ({
  style: {
    opacity: opacity.interpolate(o => o)
  }
}))`
  ${props => inheritComponent(Img, props)}
`;

const ResponsiveImg = ({ query, theme, ...rest }) => {
  return (
    <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
      {matches =>
        matches ? null : (
          <Spring
            key={uuid.v4()}
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{
              duration: 375,
              delay: 100,
              easing: easeSinOut
            }}
            native
          >
            {styles => <StyledResponsiveImg {...styles} {...rest} />}
          </Spring>
        )
      }
    </Media>
  );
};

export default withTheme(ResponsiveImg);
