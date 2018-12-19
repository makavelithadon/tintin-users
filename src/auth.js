import jwt from "jwt-decode";

export default {
  decode(jwtSource) {
    return jwt.decode(jwtSource);
  },
  login(data) {
    window.localStorage.setItem("jwt", JSON.stringify(data));
  },
  logout() {
    window.localStorage.removeItem("jwt");
  },
  isLogged() {
    try {
      const decoded = /* this.decode( */ window.localStorage.getItem("jwt"); /* ) */
      return !!decoded;
    } catch (err) {
      console.error("Not logged.");
      return false;
    }
    return true;
  }
};
