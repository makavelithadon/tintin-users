import React from "react";
import "vendors/kwicks";

class KwicksSlider extends React.Component {
  state = {
    expanded: -1
  };
  $container = null;
  options = null;
  componentDidMount() {
    this.$container = window.$(".kwicks");
    const { container, orientation, containerWidth, ...kwicksOptions } = this.props;
    this.options = kwicksOptions;
    this.$container.kwicks({
      ...this.options,
      selectOnClick: false
    });
    const items = [...this.$container.children()];
    items.forEach((item, index) => {
      item.addEventListener("mouseover", () => {
        this.setState({ expanded: index });
      });
    });
    /*this.$container.on('mouseenter', () => {
      const index = this.$container.kwicks('expanded');
      console.log('index', index);
    })*/
    this.$container.on("mouseleave", () => {
      this.setState({ expanded: -1 });
    });
  }
  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }
  handleResize = () => {
    this.$container.kwicks("destroy");
  };
  render() {
    const { container: Container, orientation, containerWidth, children } = this.props;
    const classes = `kwicks kwicks-${orientation}`;
    const CustomContainer = Container ? Container : <ul />;
    return (
      <CustomContainer className={classes} width={containerWidth}>
        {children(this.state)}
      </CustomContainer>
    );
  }
}

export default KwicksSlider;
