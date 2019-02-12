import React from "react";

function round(n) {
  return Math.round(n);
}

class ScrollHandler extends React.Component {
  static defaultProps = {
    scrollerClassName: "scroll-handler",
    onScroll: () => {}
  };

  state = {
    x: window.pageXOffset,
    y: window.pageYOffset,
    width: window.innerWidth,
    height: window.innerHeight,
    refTop: 0,
    refBottom: 0,
    refWidth: 0,
    refHeight: 0,
    isOverflow: false,
    isOverTop: false,
    isOverBottom: false
  };

  handleBoth = () => {
    const newStateFromHandleResizeHelper = this.handleResize();
    const newStateFromHandleScrollHelper = this.handleScroll();
    const newState = {
      ...newStateFromHandleResizeHelper,
      ...newStateFromHandleScrollHelper
    };
    this.props.onScroll(newState);
    this.setState(newState);
  };

  handleSetRefCoords = () => {
    this.setState({});
  };

  handleResize = () => ({ width: window.innerWidth, height: window.innerHeight });

  handleScroll = () => {
    const y = window.pageYOffset;
    const x = window.pageXOffset;
    const node = this.props.innerRef.current;
    const { top: refTop, bottom: refBottom, width: refWidth, height: refHeight } = node.getBoundingClientRect();
    const isOverTop = refTop > 0;
    const isOverBottom = round(refHeight) + round(refTop) - round(window.innerHeight) < 0;
    return {
      x,
      y,
      isOverflow: isOverBottom || isOverTop,
      isOverTop,
      isOverBottom,
      refTop,
      refBottom,
      refWidth,
      refHeight
    };
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleBoth);
    window.addEventListener("scroll", this.handleBoth);
    if (this.state.y === 0) this.handleBoth();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleBoth);
    window.removeEventListener("scroll", this.handleBoth);
  }

  render() {
    const { wrapper: Wrapper, children, innerRef, scrollerClassName } = this.props;
    const { state } = this;
    const ui = Wrapper ? (
      <Wrapper ref={innerRef}>{children(state)}</Wrapper>
    ) : (
      <div className={scrollerClassName} ref={innerRef}>
        {children(state)}
      </div>
    );

    return ui;
  }
}

export default React.forwardRef((props, ref) => <ScrollHandler innerRef={ref} {...props} />);
