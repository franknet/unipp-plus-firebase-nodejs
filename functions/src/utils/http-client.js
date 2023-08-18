/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {AxiosError} = require("axios");
const {logObject} = require("./logger");
const axios = require("axios").default;
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0";
axios.defaults.maxRedirects = 0;
axios.defaults.method = "get";
// axios.interceptors.response.use(responseInterceptor);

/**
 * @param {import("axios").AxiosResponse<any, any>} response
 * @returns {import("axios").AxiosResponse<any, any>}
 */
function responseInterceptor(response) {
  const log = {
    request: {
      method: response.config.method,
      url: response.config.url,
      headers: response.config.headers,
      payload: response.config.data,
    },
    response: {
      status: response.status,
      headers: response.headers,
      data: response.data,
    },
  };
  logObject(log);
  return response;
}

module.exports = axios;
