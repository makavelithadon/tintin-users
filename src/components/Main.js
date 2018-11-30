import React, { useContext } from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import Scrollbar from "react-smooth-scrollbar";
import Media from "react-media";
import { useWindowScrollPosition as useScroll } from "the-platform";
import { Spring, animated } from "react-spring";
import { media } from "utils";
import Menu from "components/Menu/index";
import { AppContext } from "components/App";
import Header from "./Header";
import { easePolyOut } from "d3-ease";
import faker from "faker";
import data from "data";
import { H1 } from "UI/Heading";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
  transition: ${props => props.theme.transitions.primary};
`;

const StyledContent = styled.section`
  position: relative;
  display: flex;
  margin: 0 auto;
  ${media.forEach({ xs: "100%", medium: "90%", large: "80%" }, w => `width: ${w};`)};
  left: 0;
  right: 0;
  bottom: 0;
  ${media.forEach({ xs: "30px", small: "50px", medium: "80px" }, paddingRight => `padding-right: ${paddingRight};`)};
  ${({ theme }) => {
    const { xs, ...otherSizes } = theme.styles.sidebar.width;
    return media.forEach(
      {
        xs: "30px",
        ...Object.entries(otherSizes).reduce(
          (styles, [breakpoint, paddingLeft], index) => ({
            ...styles,
            [breakpoint]: breakpoint === "small" ? `${parseInt(paddingLeft, 10) + 30}px` : paddingLeft
          }),
          {}
        )
      },
      p => `padding-left: ${p};`
    );
  }};
  height: 100%;
`;

const StyledDescription = styled(animated.div).attrs(({ x, o }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: x.interpolate(x => `translateY(${-x}px)`)
  }
}))`
  color: ${({ theme }) => theme.colors.darkGrey};
  line-height: 1.4;
  text-align: justify;
  padding-top: 15vh;
  padding-bottom: 15vh;
  ${media.forEach({ xs: "100%", medium: "70%" }, w => `width: ${w};`)};
  ${media.forEach({ xs: 0, medium: "6%" }, paddingLeft => `padding-left: ${paddingLeft};`)};
`;

const StyledPicture = styled.div`
  ${media.forEach({ xs: "100%", medium: "30%" }, w => `width: ${w};`)};
  overflow: hidden;
`;

const StyledPictureContent = styled(animated.div).attrs(({ o, x, y }) => ({
  style: {
    opacity: o.interpolate(o => o),
    transform: x.interpolate(x => `translate(${x}%, ${y}px)`)
  }
}))`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  /*background-color: ${({ theme }) => theme.colors.primary};*/
`;

const StyledParagraph = styled.p`
  margin-top: 0;
  margin-bottom: 4rem;
  font-family: ${({ theme }) => theme.fonts.tertiary};
`;

function Picture({ user, ...props }) {
  const { y: scrollY } = useScroll({ throttleMs: 1 });
  console.log("scrollY", scrollY);
  return (
    <StyledPicture>
      <StyledPictureContent {...props} y={scrollY}>
        {user.picture && (
          <img
            style={{ margin: "0 auto" }}
            src={user.picture.src}
            alt={user.displayName}
            width={user.picture.width ? user.picture.width : "100%"}
          />
        )}
      </StyledPictureContent>
    </StyledPicture>
  );
}

function Main({ theme, location }) {
  const {
    app: { menu }
  } = useContext(AppContext);
  const user = data.users.find(user => location.pathname.includes(user.slug));
  return (
    <StyledMain>
      <Menu>
        <Menu.Nav />
        <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
          {matches => (matches ? <Menu.Sidebar /> : <Header />)}
        </Media>
      </Menu>
      <StyledContent menuFrom={menu.from}>
        <Spring
          from={{ o: 0, x: -101 }}
          to={{ o: 1, x: 0 }}
          config={{ duration: 600, delay: 800, easing: easePolyOut }}
          native
        >
          {props => (
            <>
              <Media query={`(min-width: ${theme.breakpoints.values.medium})`}>
                {matches => (matches && user.picture ? <Picture {...props} user={user} /> : null)}
              </Media>
              <StyledDescription {...props}>
                <H1 color={theme.colors.primary}>{user.displayName}</H1>
                {[...new Array(30)].map((_, index) => (
                  <StyledParagraph key={index}>{faker.lorem.paragraphs()}</StyledParagraph>
                ))}
              </StyledDescription>
            </>
          )}
        </Spring>
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

export default withTheme(withRouter(Main));
