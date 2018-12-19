import jwtDecode from "jwt-decode";
const storageKey = "auth";
const storage = window.localStorage;

export default {
  decode(token) {
    return jwtDecode(token);
  },
  login(data) {
    storage.setItem(storageKey, data);
  },
  logout() {
    storage.removeItem(storageKey);
  },
  isExpired(decodedToken) {
    return decodedToken.exp < Date.now() / 1000;
  },
  isLogged() {
    try {
      if (storage.getItem(storageKey) === null) return false;
      const decoded = this.decode(storage.getItem(storageKey));
      return !!decoded && !this.isExpired(decoded);
    } catch (err) {
      console.error("Not logged.", err);
      return false;
    }
    return true;
  }
};
