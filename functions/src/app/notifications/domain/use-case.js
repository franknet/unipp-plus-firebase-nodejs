/* eslint-disable valid-jsdoc */

const {fetchSecHome} = require("../data/repository");
const {buildNotifications} = require("./builder");
const {Errors} = require("up-core").Firebase;

/**
 * @param {import("firebase-functions/v2/https").Request} request
 */
exports.fetchNotifications = async (request) => {
  try {
    const cookie = request.headers["cookie"];
    const {data} = await fetchSecHome(cookie);
    return buildNotifications(data);
  } catch (error) {
    throw Errors.onError(error);
  }
};
