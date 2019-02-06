import React, { useRef, useState } from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import Media from "react-media";
import { media } from "utils";
import { fillSizes } from "style-utils";
import CharacterListItem from "./ListItem";
import KwicksSlider from "components/KwicksSlider";
import { Spring } from "react-spring";
import { easeCircleInOut } from "d3-ease";

const sliderWidth = 80;

const StyledSlider = styled.div`
  padding: 10px;
  width: ${sliderWidth}vw;
  margin: 0 auto;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${(100 - sliderWidth) / 2}%;
    height: 100%;
    background: ${({ theme }) => theme.colors.background /*'red'*/};
    z-index: 10;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;

const StyledContainer = styled.div`
  margin: 0 auto;
  ${fillSizes()};
  position: relative;
  ${media.small`height: 50vh;`}
`;

const StyledItemContainer = styled.div`
  height: 100%;
  overflow: initial !important;
  will-chnage: left, right, width;
`;

function CharactersList({ characters, history, theme }) {
  //const [sliderX, setSliderX] = useState(0);
  const sliderRef = useRef(null);
  const itemsCount = characters.length;
  const spacing = 14;
  const itemDefaultWidth = 220 + spacing;
  const containerWidth = itemDefaultWidth * itemsCount;
  const expandedWidth = itemDefaultWidth + 180;
  // const minimalSize = Math.round((containerWidth - expandedWidth) / (itemsCount - 1));
  return (
    <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
      {matches =>
        matches ? (
          <StyledSlider ref={sliderRef}>
            <KwicksSlider
              orientation={"horizontal"}
              container={StyledContainer}
              containerWidth={containerWidth}
              maxSize={expandedWidth}
              spacing={spacing}
              duration={550}
              behavior={"menu"}
              easing={"easeInOutCirc"}
              delayMouseIn={125}
            >
              {({ expanded }) => {
                const allCollapsed = expanded === -1;
                const gapX = 20;
                return characters.map((character, index) => {
                  const isBefore = expanded > index;
                  const isAfter = expanded < index;
                  const isExpanded = expanded === index;
                  const xTransform = allCollapsed ? 0 : isBefore ? -gapX : isAfter ? gapX : 0;
                  return (
                    <Spring
                      key={character.displayName}
                      from={{ x: 0 }}
                      to={{ x: xTransform }}
                      config={{ easing: easeCircleInOut, duration: 250 }}
                      native
                    >
                      {({ x }) => {
                        return (
                          <StyledItemContainer>
                            <CharacterListItem
                              count={characters.length}
                              character={character}
                              x={x}
                              isSelected={isExpanded}
                            />
                          </StyledItemContainer>
                        );
                      }}
                    </Spring>
                  );
                });
              }}
            </KwicksSlider>
          </StyledSlider>
        ) : null
      }
    </Media>
  );
}

export default withRouter(withTheme(CharactersList));
