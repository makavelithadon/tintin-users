import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import { Trail, animated } from "react-spring";
import { easeSinOut } from "d3-ease";
import { fillSizes, inheritComponent } from "style-utils";
import Helpers from "UI/Helpers";
import { H1 } from "UI/Heading";

const StyledDisplayName = styled(Helpers.FilterInvalidDOMAttributes).attrs(({ o, r }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: r.interpolate(r => `rotate(${r}deg)`)
  }
}))`
  ${props => inheritComponent(H1, props, `position: absolute; top: 0;`)}
`;

const StyledLetterContainer = styled.span`
  display: inline-block;
  overflow: hidden;
  position: relative;
`;

const StyledFakeSpanLetter = styled.span`
  opacity: 0;
  user-select: none;
`;
const StyledLetter = styled(animated.span).attrs(({ o, y }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: y.interpolate(y => `translate3d(0, ${y}px, 0)`)
  }
}))`
  ${fillSizes()}
`;

function CharacterDisplayName({ style, name: nameFromParent }) {
  const [name] = useState(nameFromParent);
  return (
    <StyledDisplayName {...style} component={animated.h1} uppercase color={"primary"}>
      <Trail
        items={name.split("").map((letter, index) => ({
          letter,
          index
        }))}
        keys={item => `${item.letter}-${item.index}`}
        from={{ o: 0, y: 60 }}
        to={{ o: 1, y: 0 }}
        config={key => ({
          clamp: true,
          duration: key === "o" ? 250 : 500,
          easing: easeSinOut
        })}
        native
      >
        {({ letter }) => props => {
          let spanProps = {};
          if (letter === " ") spanProps = { ...spanProps, dangerouslySetInnerHTML: { __html: "&nbsp;" } };
          return (
            <StyledLetterContainer>
              <StyledFakeSpanLetter {...spanProps}>{letter === " " ? null : letter}</StyledFakeSpanLetter>
              <StyledLetter {...props}>{letter}</StyledLetter>
            </StyledLetterContainer>
          );
        }}
      </Trail>
    </StyledDisplayName>
  );
}

export default withRouter(CharacterDisplayName);
