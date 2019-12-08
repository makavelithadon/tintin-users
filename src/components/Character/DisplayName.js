import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { animated } from "react-spring";
import { inheritComponent } from "style-utils";
import Helpers from "UI/Helpers";
import { H1 } from "UI/Heading";
import RotatedSlidedUpText from "components/Animations/Text/RotatedSlidedUp";

const StyledDisplayName = styled(Helpers.FilterInvalidDOMAttributes).attrs(
  ({ o, r }) => ({
    style: {
      opacity: o.interpolate(o => o),
      transform: r.interpolate(r => `rotate(${r}deg)`)
    }
  })
)`
  ${props =>
    inheritComponent(
      H1,
      props,
      `position: absolute; top: 0; color: ${props.theme.colors.white};`
    )}
`;

function CharacterDisplayName({ style, name: nameFromParent }) {
  const [name] = useState(nameFromParent);
  return (
    <StyledDisplayName
      {...style}
      component={animated.h1}
      uppercase
      color={"primary"}
    >
      <RotatedSlidedUpText
        text={name}
        animationState={"enter"}
        config={{
          enter: { delay: 1 }
        }}
      />
    </StyledDisplayName>
  );
}

export default withRouter(CharacterDisplayName);
