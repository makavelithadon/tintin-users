import styled from "styled-components";

const StyledParagraph = styled.p.attrs(() => ({
  role: "Paragraph"
}))`
  margin-top: 0;
  margin-bottom: 4rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text};
`;

export default StyledParagraph;
