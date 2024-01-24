/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const Logger = require("../firebase/logger");
const axios = require("axios").default;
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0";
axios.defaults.maxRedirects = 0;
axios.defaults.method = "get";
axios.interceptors.response.use(responseInterceptor);

const ACCEPTED_CONTENT_TYPES = [
  "application/json",
  "text/plain",
];

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
      data: response.config.data,
    },
    response: {
      status: response.status,
      headers: response.headers,
    },
  };
  if (ACCEPTED_CONTENT_TYPES.includes(response.headers["content-type"].split(";")[0])) {
    log.response["data"] = response.data;
  }
  Logger.debug("HttpClient", log);
  return response;
}

module.exports = axios;
