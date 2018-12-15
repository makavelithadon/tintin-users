import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import { media } from "utils";
import login01 from "assets/img/admin/login/01.jpg";
import FormLogin from "components/FormLogin/FormLogin";

const StyledLogin = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StyledCard = styled.article`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
  ${media.forEach({ xs: "92%", small: "80%", medium: "60%", large: "40%" }, width => `width: ${width};`)};
  ${media.forEach({ xs: "90vh", medium: "50vh" }, minHeight => `min-height: ${minHeight};`)};
  transition: ${props => props.theme.transitions.primary};
  box-shadow: ${({ theme }) => theme.shadows.box};
  display: flex;
  overflow: hidden;
`;

const StyledImg = styled.div`
  background: url(${login01}) no-repeat center;
  background-size: cover;
  flex-basis: 40%;
`;

function Login({ theme }) {
  return (
    <StyledLogin>
      <StyledCard>
        <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
          {matches => (matches ? <StyledImg /> : null)}
        </Media>
        <FormLogin />
      </StyledCard>
    </StyledLogin>
  );
}

export default withTheme(Login);
