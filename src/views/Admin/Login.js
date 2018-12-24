import React from "react";
import styled, { withTheme } from "styled-components";
import Media from "react-media";
import { media, randomize } from "utils";
import login01 from "assets/img/admin/login/01.jpg";
import login02 from "assets/img/admin/login/02.jpg";
import FormLogin from "containers/FormLogin";
import NavLink from "components/NavLink";

const images = [login01, login02];

const StyledLogin = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StyledCard = styled.article`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
  ${media.forEach({ medium: "45vh" }, minHeight => `min-height: ${minHeight};`)};
  ${media.forEach({ xs: "auto", small: "500px", large: "40vw" }, width => `width: ${width};`)};
  transition: ${props => props.theme.transitions.primary};
  box-shadow: ${({ theme }) => theme.shadows.box};
  display: flex;
  overflow: hidden;
`;

const StyledImg = styled.div`
  background: ${({ images }) => `url(${images[randomize(0, images.length - 1)]}) no-repeat center`};
  background-size: cover;
  flex-basis: 60%;
`;

function Login({ theme }) {
  return (
    <StyledLogin>
      <StyledCard>
        <FormLogin />
        <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
          {matches => (matches ? <StyledImg images={images} /> : null)}
        </Media>
      </StyledCard>
      <NavLink to={"/"}>Go back to Home</NavLink>
    </StyledLogin>
  );
}

export default withTheme(Login);
