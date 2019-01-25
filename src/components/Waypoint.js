import React from "react";
import Waypoint from "react-waypoint";
import PropTypes from "prop-types";

function SimpleWaypoint({ children, ...waypointProps }) {
  return (
    <Waypoint {...waypointProps}>
      <div>{children}</div>
    </Waypoint>
  );
}

SimpleWaypoint.defaultProps = {
  onEnter: () => {
    console.log("element entering the viewport.");
  }
};

SimpleWaypoint.propTypes = {
  onEnter: PropTypes.func,
  onLeave: PropTypes.func
};

export default SimpleWaypoint;
