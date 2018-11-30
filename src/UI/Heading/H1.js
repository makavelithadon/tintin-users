import styled from "styled-components";
import { media } from "utils";

const StyledH1 = styled.h1.attrs(props => ({
  rel: props.rel || "title"
}))`
  color: ${({ theme, color }) => (color ? color : theme.colors.darkGrey)};
  ${media.forEach({ xs: "3rem", small: "5rem" }, fZ => `font-size: ${fZ};`)};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-top: 0;
`;

export default StyledH1;
