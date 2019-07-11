import styled from "styled-components";
import { media } from "utils";
import Common from "./common";

const StyledH1 = styled(Common)`
  ${media.forEach({ xs: "4rem", small: "7rem" }, fZ => `font-size: ${fZ};`)};
`;

export default StyledH1;
