import React from "react";

import styled from "styled-components";
import Common from "./common";

const StyledImg = styled(Common)``;

const Img = props => {
  return <StyledImg {...props} />;
};

export default Img;
