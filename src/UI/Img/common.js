import styled from "styled-components";

const StyledCommonImg = styled.img.attrs(
  ({ alt = "An image", ariaLabel = "Image" }) => ({
    alt,
    "aria-label": ariaLabel,
    role: "img"
  })
)`
  display: inline-block;
  width: 100%;
  border: none;
  outline: 0;
  outline-offset: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export default StyledCommonImg;
