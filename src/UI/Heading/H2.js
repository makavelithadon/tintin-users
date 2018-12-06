import styled from "styled-components";
import { media } from "utils";

const StyledH1 = styled.h2.attrs(props => ({
  rel: props.rel || "title"
}))`
  margin-top: 0;
  line-height: 1;
  color: ${({ theme, color }) => (color ? color : theme.colors.text)};
  ${media.forEach({ xs: "1.5rem", small: "2.5rem" }, fZ => `font-size: ${fZ};`)};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export default StyledH1;
