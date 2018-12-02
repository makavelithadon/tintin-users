import React, { useContext } from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
// import Scrollbar from "react-smooth-scrollbar";
import Media from "react-media";
import { Spring } from "react-spring";
import { media } from "utils";
import Menu from "components/Menu/index";
import { AppContext } from "components/App";
import Header from "./Header";
import { easePolyOut } from "d3-ease";
import data from "data";
import ScrolledPictures from "./ScrolledPictures";
import Description from "./Description";

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
  padding-top: 15vh;
  ${media.forEach({ xs: "30px", small: "50px", medium: "80px" }, paddingRight => `padding-right: ${paddingRight};`)};
  ${({ theme }) => {
    const { xs, ...otherSizes } = theme.styles.sidebar.width;
    return media.forEach(
      {
        xs: "30px",
        ...Object.entries(otherSizes).reduce(
          (styles, [breakpoint, paddingLeft]) => ({
            ...styles,
            [breakpoint]: breakpoint === "small" ? `${parseInt(paddingLeft, 10) + 30}px` : paddingLeft
          }),
          {}
        )
      },
      p => `padding-left: ${p};`
    );
  }};
  padding-bottom: 35vh;
  height: 100%;
`;

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
                {matches => (matches && user.pictures ? <ScrolledPictures {...props} user={user} /> : null)}
              </Media>
              <Description {...props} user={user} />
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
