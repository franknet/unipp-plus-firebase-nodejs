
const {HttpClient, HttpStatus} = require("up-core").Http;

/**
 * @returns {Promise<import("axios").AxiosResponse>}
 */

exports.fetchSec = (url) => new Promise((resolve, reject) => {
  HttpClient.request({
    url: url,
    validateStatus: HttpStatus.Redirect,
  }).then((response) => {
    const {headers} = response;
    const homeUrl = headers["location"];
    const cookie = headers["set-cookie"];

    HttpClient.request({
      url: homeUrl,
      headers: {"Cookie": cookie},
      validateStatus: HttpStatus.Redirect,
    }).then(resolve(response)).catch(reject);
  }).catch(reject);
});
