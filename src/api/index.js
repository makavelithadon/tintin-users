import "unfetch/polyfill/index.js";
import { checkStatus } from "./utils";

export default {
  async get(url) {
    let response = await fetch(url);
    return await checkStatus(response);
  }
};
