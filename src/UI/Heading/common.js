import styled from "styled-components";

const StyledHeading = styled.h1.attrs(props => ({
  rel: props.rel || "title"
}))`
  margin-top: 0;
  line-height: 1;
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "initial")};
`;

export default StyledHeading;
