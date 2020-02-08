import React, { forwardRef } from "react";
import styled from "styled-components";
import { isValidDOMAttribute } from "utils";

export const FilterInvalidDOMAttributes = styled(
  forwardRef(({ component: Component, ...rest }, ref) => {
    const finalProps = Object.entries(rest).reduce(
      (acc, [attr, value]) =>
        isValidDOMAttribute(attr, Component.target ? Component.target : "div")
          ? { ...acc, [attr]: value }
          : acc,
      {}
    );
    return <Component {...finalProps} ref={ref} />;
  })
)``;

export default {
  FilterInvalidDOMAttributes
};
