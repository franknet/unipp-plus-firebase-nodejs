/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {logObject} = require("./logger");
const axios = require("axios").default;
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0";
axios.defaults.maxRedirects = 0;
axios.defaults.method = "get";
const isDebug = process.env["FIREBASE_DEBUG_MODE"] == "true";
if (isDebug) {
  axios.interceptors.response.use(responseInterceptor);
}

/**
 * @param {import("axios").AxiosResponse<any, any>} response
 * @returns {import("axios").AxiosResponse<any, any>}
 */
function responseInterceptor(response) {
  const acceptedContentTypes = [
    "application/json",
    "application/json; charset=utf-8",
    "text/plain",
    "text/plain; charset=utf-8",
  ];

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
    },
  };
  if (acceptedContentTypes.includes(response.headers["content-type"])) {
    log.response["data"] = response.data;
  }
  logObject(log);
  return response;
}

module.exports = axios;
