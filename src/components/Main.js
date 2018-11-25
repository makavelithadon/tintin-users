import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { withRouter } from "react-router-dom";
import Scrollbar from "react-smooth-scrollbar";
import { media } from "utils";
import Menu from "components/Menu/index";
import { AppContext } from "components/App";
import Header from "./Header";
import faker from "faker";
import data from "data";

const StyledMain = styled.main`
  position: relative;
  /* overflow: hidden; */
  min-height: 100vh;
  ${({ menuFrom, theme }) => {
    if (menuFrom === "left") {
      return media.forEach(theme.sizes.header.height, h => `padding-left: ${h};`);
    }
  }}
  ${({ theme }) =>
    media.forEach(theme.sizes.body.padding, padding => `min-height: calc(100vh - (${parseInt(padding, 10) * 2}px))`)};
  transition: ${props => props.theme.transitions.primary};
`;

const StyledContent = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20vh 10vh;
  ${({ theme, menuFrom }) => {
    const {
      body: { padding: bodyPadding },
      header: { height: headerHeight }
    } = theme.sizes;
    if (menuFrom === "left") return `height: 100%;`;
    return media.forEach(
      bodyPadding,
      (padding, breakpoint) =>
        `height: calc(100vh - (${parseInt(padding, 10) * 2}px + ${
          headerHeight[breakpoint] ? headerHeight[breakpoint] : media.getHigherFromBreakpoints(headerHeight)
        }));`
    );
  }};
`;

const appearFromBottom = keyframes`
0% {
  opacity: 0;
  transform: translateY(20vh);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

const appearFromLeft = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {
  opacity: 1;
  transform: translateX(0);
}
`;

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.darkGrey};
  line-height: 1.4;
  text-shadow: ${({ theme }) => theme.shadows.text};
  opacity: 0;
  animation: ${appearFromBottom} 800ms 1000ms forwards cubic-bezier(0.23, 1, 0.32, 1);
  ${media.forEach({ xs: "100%", medium: "74%" }, w => `width: ${w};`)};
  ${media.forEach({ xs: 0, medium: "3%", large: "7%" }, paddingLeft => `padding-left: ${paddingLeft};`)};
`;

const StyledPicture = styled.div`
  ${media.forEach({ xs: "none", medium: "block" }, d => `display: ${d};`)};
  ${media.forEach({ xs: "100%", medium: "26%" }, w => `width: ${w};`)};
  overflow: hidden;
`;

const StyledPictureContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateX(-100%);
  animation: ${appearFromLeft} 800ms 1000ms forwards cubic-bezier(0.23, 1, 0.32, 1);
`;

const StyledDisplayName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 0;
  font-size: 4rem;
`;

const StyledParagraph = styled.p`
  margin-top: 0;
  margin-bottom: 4rem;
  font-family: "Segoe UI", sans-serif;
`;

function Main(props) {
  const {
    app: { menu }
  } = useContext(AppContext);
  const user = data.users.find(user => props.location.pathname.includes(user.slug));
  return (
    <StyledMain menuFrom={menu.from}>
      <Menu>
        {menu.from !== "left" && <Header />}
        <Menu.Nav />
        {menu.from === "left" && <Menu.Sidebar />}
      </Menu>
      <StyledContent menuFrom={menu.from}>
        <StyledPicture>
          <StyledPictureContent>
            {user.picture && <img style={{ width: "100%" }} src={user.picture} alt={user.displayName} />}
          </StyledPictureContent>
        </StyledPicture>
        <StyledDescription>
          <StyledDisplayName>{user.displayName}</StyledDisplayName>
          {[...new Array(10)].map((_, index) => (
            <StyledParagraph key={index}>{faker.lorem.paragraphs()}</StyledParagraph>
          ))}
        </StyledDescription>
      </StyledContent>
      {/* <Scrollbar>
        <StyledContent>
          <div style={{ padding: "200px 24px 24px" }}>
            {[...new Array(18)].map((_, index) => (
              <p style={{ marginTop: 0 }} key={index}>
                {faker.lorem.paragraphs()}
              </p>
            ))}
          </div>
        </StyledContent>
      </Scrollbar> */}
    </StyledMain>
  );
}

export default withRouter(Main);
