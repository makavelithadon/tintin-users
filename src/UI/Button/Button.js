import styled from "styled-components";
import { media } from "utils";

const StyledButton = styled.button.attrs({
  role: "button"
})`
  padding: 12px 20px;
  border-radius: 9999px;
  border: none;
  outline: 0;
  outline-offset: 0;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.box};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  ${media.forEach({ xs: "1rem", medium: "1.3rem" }, fZ => `font-size: ${fZ};`)}
`;

export default StyledButton;
