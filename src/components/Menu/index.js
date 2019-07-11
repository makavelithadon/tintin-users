import React, { createContext, useContext, Component } from "react";
import Burger from "./Burger";
import Nav from "containers/Nav";
import Sidebar from "./Sidebar";

const MenuContext = createContext();

function Consumer({ children }) {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Context is undefined, please be sure that you are well placed on the correspondig provider");
  }
  return children(context);
}

export default class Menu extends Component {
  static Consumer = Consumer;
  static Burger = Burger;
  static Nav = Nav;
  static Sidebar = Sidebar;
  toggle = value => this.setState(state => ({ isOpen: typeof value !== "undefined" ? value : !state.isOpen }));
  state = {
    isOpen: false,
    toggle: this.toggle
  };
  render() {
    const { children } = this.props;
    const ui = typeof children === "function" ? children() : children;
    return <MenuContext.Provider value={this.state}>{ui}</MenuContext.Provider>;
  }
}

Menu.displayName = "Menu";
