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
      const tokenFromStorage = this.getToken();
      if (tokenFromStorage === null) return false;
      const decoded = this.decode(tokenFromStorage);
      return !!decoded && !this.isExpired(decoded);
    } catch (err) {
      console.error("Failed to decode the provided storage token.", err);
      return false;
    }
    return true;
  },
  getToken() {
    return storage.getItem(storageKey);
  },
  getDecodedToken() {
    return this.decode(this.getToken());
  }
};
