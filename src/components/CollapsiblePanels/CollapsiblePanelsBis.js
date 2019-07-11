import React from "react";
import styled from "styled-components";
import { Spring } from "react-spring";
import PropTypes from "prop-types";
import * as easings from "d3-ease";
import { getDeepKey, getCSSProperty, stripUnits } from "utils";
import { getStartAnimations, getEndAnimations, flatAnimatedObjectKeys, setAnimationsList } from "./utils";

const debug = true;
const debugColors = ["#0ebeff", "#30acf4", "#539be9", "#7589de", "#9877d4", "#ba65c9", "#dd54be", "#ff42b3"];
const container = {
  debugColor: theme => getDeepKey(theme, "colors.primary"),
  debugHeight: "400px"
};

const Container = styled.div`
  background-color: ${({ theme }) => (debug ? container.debugColor(theme) : "transparent")};
  height: ${debug ? container.debugHeight : "auto"};
`;

export default class CollapsiblePanels extends React.Component {
  _setAnimationsList = (hoveredIndex, isFirst = false, expandedRatio) => {
    const count = this.props.itemsCount;
    const containerWidth = this.container
      ? stripUnits(getCSSProperty(this.container, "width"))
      : this.props.container.width;
    if (isFirst) {
      return [...new Array(count)].reduce(
        (acc, _, index) => ({
          ...acc,
          [`${index}-left-start`]: index * (containerWidth / count) + "px",
          [`${index}-left-end`]: index * (containerWidth / count) + "px",
          [`${index}-width-start`]: 100 / count + "%",
          [`${index}-width-end`]: 100 / count + "%"
        }),
        {}
      );
    }
    const hoveredWidth = (containerWidth / count) * expandedRatio;
    const unHoveredWidth = (containerWidth - hoveredWidth) / (count - 1);
    const mergedList = this.items.map((item, index) => {
      const isHovered = index === hoveredIndex;
      const isBefore = index < hoveredIndex;
      return {
        [`${index}-left-start`]: stripUnits(getCSSProperty(item, "left")),
        [`${index}-width-start`]: stripUnits(getCSSProperty(item, "width")),
        [`${index}-left-end`]: isHovered
          ? index * unHoveredWidth
          : isBefore
          ? stripUnits(index * unHoveredWidth)
          : (index - 1) * unHoveredWidth + hoveredWidth,
        [`${index}-width-end`]: isHovered ? hoveredWidth + 3 : unHoveredWidth + 3
      };
    });
    return { ...mergedList.reduce((acc, item) => ({ ...acc, ...item }), {}) };
  };
  state = {
    hoveredIndex: -1,
    initialized: false,
    animations: this._setAnimationsList(null, true, this.props.growRatio)
  };
  container = null;
  items = null;
  componentDidMount() {
    this._init();
  }
  _init() {
    const { container } = this.props;
    const { ref, width } = container;
    this.container = ref.current;
    this.items = [...this.container.children];
    this._setCSS(this.container, { width: `${width}px` });
    this._initItems(this.items.length);
    //this.setState({ initialized: true });
  }
  _initItems = count => {
    this.items.forEach(panel => {
      this._setCSS(panel, {
        width: `${this.props.container.width / count}px`,
        float: "left",
        display: this.props.flexBox ? "inline-flex" : "inline-block",
        position: "absolute"
      });
    });
  };
  _setCSS = (element, styles) => {
    Object.keys(styles).forEach(key => (element.style[key] = styles[key]));
  };
  _getCSS = (element, ...properties) => {
    //const obj = element.map(el => );
    //console.log('obj', obj);
    return properties.reduce((acc, prop) => {
      return { ...acc, [prop]: getCSSProperty(element, prop) };
    }, {});
    //({ width: calculatedWidth, float: ..., display: ... })
  };
  getItemsStyles = () => {
    if (!this.items) return [];
    const styles = this.items.map((item, index) => ({
      ...this._getCSS(item, "float", "display"),
      ...(debug && { backgroundColor: debugColors[index] })
    }));
    return styles;
  };
  getItemStyle = index => {
    if (!this.items) return {};
    return {
      ...this._getCSS(this.items[index], "float", "display"),
      ...(debug && { backgroundColor: debugColors[index] })
    };
  };
  getItemProps = index => {
    return {
      onMouseOver: () => this.handleHover(index),
      onMouseLeave: () => this.handleMouseLeave(index)
    };
  };
  handleHover = (index, resize = false) => {
    //if (lastHoveredIndex === index && !resize) return;
    //setLastHoveredIndex(index);
    const { expandedRatio, onHover } = this.props;
    this.setState({ hoveredIndex: index });
    this.setState({ animations: this._setAnimationsList(index, false, expandedRatio) });
    onHover && onHover(index);
  };
  handleMouseLeave = index => {
    const { onLeave } = this.props;
    onLeave && onLeave(index);
  };
  render() {
    const { container, children, easing, duration } = this.props;
    const { ref } = container;
    const { state, getItemsStyles, getItemStyle, getItemProps } = this;
    const { initialized, hoveredIndex, animations, ...rest } = state;
    const finalState = {
      hoveredIndex,
      getItemsStyles,
      getItemStyle,
      getItemProps,
      ...rest
    };
    return (
      <Container ref={ref}>
        <Spring
          from={flatAnimatedObjectKeys(getStartAnimations(animations))}
          to={flatAnimatedObjectKeys(getEndAnimations(animations))}
          config={{ easing: easings[easing], duration }}
          reset={true}
        >
          {styles =>
            children({
              ...finalState,
              styles
            })
          }
        </Spring>
      </Container>
    );
  }
}

CollapsiblePanels.propTypes = {
  flexBox: PropTypes.bool,
  container: PropTypes.shape({
    ref: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Element)])
    }),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  easing: PropTypes.string,
  expandedRatio: PropTypes.number,
  itemsCount: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
  duration: PropTypes.number
};

CollapsiblePanels.defaultProps = {
  flexBox: true,
  container: {
    width: "100%"
  },
  easing: "easeExpOut",
  expandedRatio: 1.5,
  duration: 500
};
