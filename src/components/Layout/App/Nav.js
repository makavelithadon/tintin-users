import React from "react";
import { withTheme } from "styled-components";
import Menu from "components/Menu";
import Header from "components/Header";
import Media from "react-media";

function Nav({ theme }) {
  return (
    <Menu>
      <Menu.Nav />
      <Media query={`(min-width: ${theme.breakpoints.values.small})`}>
        {matches => (matches ? <Menu.Sidebar /> : <Header />)}
      </Media>
    </Menu>
  );
}

export default withTheme(Nav);
