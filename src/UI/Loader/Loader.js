import React from "react";
import styled from "styled-components";
import { center } from "style-utils";

const StyledLoading = styled.div`
  ${center()}
`;

export default function Loader({ children }) {
  return <StyledLoading>{children}</StyledLoading>;
}

Loader.defaultProps = {
  children: "Loading..."
};
