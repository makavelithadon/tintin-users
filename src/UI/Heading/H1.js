import styled from "styled-components";
import { media } from "utils";

const StyledH1 = styled.h1.attrs(props => ({
  rel: props.rel || "title"
}))`
  margin-top: 0;
  line-height: 1;
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  ${media.forEach({ xs: "3rem", small: "5rem" }, fZ => `font-size: ${fZ};`)};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export default StyledH1;
