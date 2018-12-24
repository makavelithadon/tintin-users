import axios from "axios";

const __ENDPOINT__ = process.env.REACT_APP_API_URL;

export default {
  login(credentials) {
    return axios.post(`${__ENDPOINT__}/admin/login`, credentials);
  }
};
