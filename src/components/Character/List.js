import React, { useRef, useState } from "react";
import styled, { css, withTheme } from "styled-components";
import Media from "react-media";
import { media } from "utils";
import { fillSizes } from "style-utils";
import CharacterListItem from "./ListItem";
import KwicksSlider from "components/KwicksSlider";
import { Spring, animated, interpolate } from "react-spring";
import { easeCircleInOut } from "d3-ease";
import { inheritComponent } from "style-utils";
import Helpers from "UI/Helpers";

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

const StyledContainer = styled.ul`
  margin: 0 auto;
  ${fillSizes()};
  position: relative;
  ${media.small`height: 50vh;`}
`;

const StyledItemContainer = styled(Helpers.FilterInvalidDOMAttributes).attrs(({ x }) => ({
  style: {
    transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
  }
}))`
  ${props => {
    const baseComponent = styled.li``;
    return inheritComponent(baseComponent, props);
  }};
  height: 100%;
  overflow: initial !important;
  will-change: left, right, width, transform;
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.transparent : theme.colors.white)};
  box-shadow: ${({ theme, isSelected }) => (isSelected ? "none" : theme.shadows.box2)};
  border-radius: 8px;
  transition: ${({ duration, delay }) => {
    const tranisitionedProperties = ["background-color", "box-shadow"];
    return css`
      ${tranisitionedProperties.reduce(
        (rules, property, index) =>
          rules +
          `${property} ${duration}ms ${delay}ms ease-out${(index !== tranisitionedProperties.length - 1 && ", ") ||
            ""}`,
        ``
      )}
    `;
  }};
`;

function CharactersList({ characters, theme }) {
  //const [sliderX, setSliderX] = useState(0);
  const sliderRef = useRef(null);
  const itemsCount = characters.length;
  const spacing = 14;
  const itemDefaultWidth = 220 + spacing;
  const containerWidth = itemDefaultWidth * itemsCount;
  const expandedWidth = itemDefaultWidth + 180;
  const delayBeforeTriggerSlide = 125;
  const durationSlideAnimation = 350;
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
              duration={durationSlideAnimation}
              behavior={"menu"}
              easing={"easeInCirc"}
              delayMouseIn={delayBeforeTriggerSlide}
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
                      config={{
                        easing: easeCircleInOut,
                        duration: durationSlideAnimation,
                        delay: delayBeforeTriggerSlide
                      }}
                      native
                    >
                      {({ x }) => {
                        return (
                          <StyledItemContainer
                            component={animated.li}
                            x={x}
                            isSelected={isExpanded}
                            duration={durationSlideAnimation}
                            delay={delayBeforeTriggerSlide}
                          >
                            <CharacterListItem
                              count={characters.length}
                              character={character}
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

export default withTheme(CharactersList);
