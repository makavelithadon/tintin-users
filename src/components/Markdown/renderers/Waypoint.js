import React, { useState } from "react";
import styled from "styled-components";
import { Spring, animated } from "react-spring";
import SimpleWaypoint from "components/Waypoint";
import { easeSinOut } from "d3-ease";

const StyledWaypoint = styled(animated.div).attrs(({ opacity, gap }) => ({
  style: {
    opacity: opacity.interpolate(o => o),
    transform: gap.interpolate(z => `translateX(${z}px)`)
  }
}))``;

const Waypoint = props => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <SimpleWaypoint bottomOffset={"30%"} onEnter={handleShow}>
      <Spring
        from={{ opacity: 0, gap: 15 }}
        to={{ opacity: Number(show), gap: show ? 0 : 15 }}
        config={key => ({ duration: key === "opacity" ? 125 : 300, delay: 125, easing: easeSinOut })}
        native
      >
        {styles => <StyledWaypoint {...styles} {...props} />}
      </Spring>
    </SimpleWaypoint>
  );
};

export default Waypoint;
