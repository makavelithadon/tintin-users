import React from "react";
import NavItem from "./Item";

export default function List({ list, ...restProps }) {
  return list.map(character => <NavItem key={character.id} item={character} {...restProps} />);
}
