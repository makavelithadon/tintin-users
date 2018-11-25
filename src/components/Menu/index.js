import React, { createContext, useState, Component } from "react";
import Provider from "./Provider";
import Burger from "./Burger";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

export const MenuContext = createContext();

export function useMenu(element) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = value => setIsOpen(value ? value : !isOpen);
  return {
    isOpen,
    toggle
  };
}

export default class Menu extends Component {
  static Burger = Burger;
  static Nav = Nav;
  static Sidebar = Sidebar;
  render() {
    return <Provider>{this.props.children}</Provider>;
  }
}
