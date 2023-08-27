/* eslint-disable valid-jsdoc */

const {fetchSecHome} = require("../data/repository");
const {buildNotifications} = require("./builder");
const {onError} = require("../../../utils/https-errors");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchNotifications = async (session) => {
  try {
    const {data} = await fetchSecHome(session);
    return buildNotifications(data);
  } catch (error) {
    throw onError(error);
  }
};
