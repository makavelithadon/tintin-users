import React from "react";
import styled from "styled-components";
import { media } from "utils";
import Common from "./common";

const StyledCustomH2 = styled(Common)`
  ${media.forEach({ xs: "2.25rem", small: "2.8rem" }, fZ => `font-size: ${fZ};`)};
  font-weight: 700;
`;

const StyledH2 = props => <StyledCustomH2 as={"h2"} {...props} />;

export default StyledH2;
