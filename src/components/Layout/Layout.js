import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import Media from "react-media";
import Menu from "components/Menu";
import Header from "components/Header";
import { scrollToTop } from "utils";

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
  transition: ${props => props.theme.transitions.primary};
`;

const StyledContent = styled.section`
  position: relative;
`;

class Layout extends React.Component {
  componentDidMount() {
    scrollToTop();
    console.log("mounting");
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      scrollToTop();
    }
  }
  render() {
    const { children, theme } = this.props;
    const page = typeof children === "function" ? children() : children;
    return (
      <StyledMain>
        <Menu>
          <Menu.Nav />
          <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
            {matches => (matches ? <Menu.Sidebar /> : <Header />)}
          </Media>
        </Menu>
        <StyledContent>{page}</StyledContent>
      </StyledMain>
    );
  }
}

export default withRouter(withTheme(Layout));
