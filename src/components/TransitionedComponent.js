import React from "react";
import { Transition, config } from "react-spring";
import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { easeSinOut } from "d3-ease";

const TransitionedComponent = ({
  location,
  path,
  render,
  transition,
  ...restProps
}) => {
  return (
    <Transition keys={location.pathname} {...transition} native>
      {item => transitionedStyles => (
        <Switch location={location}>
          <Route
            path={path}
            render={props => render(transitionedStyles, props)}
          />
        </Switch>
      )}
    </Transition>
  );
};

TransitionedComponent.defaultProps = {
  transition: {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      ...config.default,
      easing: easeSinOut
    }
  }
};

TransitionedComponent.propTypes = {
  location: PropTypes.object,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  transition: PropTypes.shape({
    from: PropTypes.object.isRequired,
    enter: PropTypes.object.isRequired,
    leave: PropTypes.object.isRequired,
    config: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  })
};

TransitionedComponent.displayName =
  TransitionedComponent.name || "TransitionedComponent";

export default withRouter(TransitionedComponent);
