import axios from "axios";

const ENDPOINT = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default {
  login(credentials) {
    return axios.post(`${ENDPOINT}/admin/login`, credentials);
  }
};
