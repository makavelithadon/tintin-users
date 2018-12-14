import jwt from "jwt-decode";

export default {
  decode(jwtSource) {
    return jwt.decode(jwtSource);
  },
  isLogged() {
    try {
      const decoded = this.decode(window.localStorage.getItem("jwt"));
      return !!decoded;
    } catch (err) {
      console.error("jwt");
      return false;
    }
    return true;
  }
};
