import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Trail, animated } from "react-spring";
import { easeSinOut } from "d3-ease";
import { media } from "utils";
import { fillSizes } from "style-utils";

const StyledDisplayName = styled(animated.h1).attrs(({ o, r }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: r.interpolate(r => `rotate(${r}deg)`)
  }
}))`
  position: absolute;
  top: 0;
  margin: 0;
  margin-top: 0;
  line-height: 1;
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "initial")};
  ${media.forEach({ xs: "4rem", small: "7rem" }, fZ => `font-size: ${fZ};`)};
`;

const StyledLetterContainer = styled.span`
  display: inline-block;
  overflow: hidden;
  position: relative;
`;

const StyledFakeSpanLetter = styled.span`
  opacity: 0;
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
    <StyledDisplayName {...style} uppercase color={"primary"}>
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
