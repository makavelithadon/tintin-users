import jwt from "jwt-decode";

export default {
  decode(jwtSource) {
    return jwt.decode(jwtSource);
  },
  login(data) {
    window.localStorage.setItem("jwt", JSON.stringify(data));
  },
  isLogged() {
    try {
      const decoded = /* this.decode( */ window.localStorage.getItem("jwt"); /* ) */
      console.log("logged from auth");
      return !!decoded;
    } catch (err) {
      console.error("Not logged.");
      console.log("not logged from auth");
      return false;
    }
    console.log("logged from auth");
    return true;
  }
};
