import React from "react";

const withSpring = spring => C => props =>
  React.cloneElement(spring, { children: styles => <C {...props} styles={styles} /> });

export default withSpring;
