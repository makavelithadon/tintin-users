import React from "react";
import { ADMIN_LOGIN } from "routes";

export default function Logout({ logout, history }) {
  logout();
  history.replace(ADMIN_LOGIN);
  return <div>Logout</div>;
}
