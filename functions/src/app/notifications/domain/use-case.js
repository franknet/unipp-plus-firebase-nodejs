/* eslint-disable valid-jsdoc */

const { fetchSecHome } = require("../data/repository");
const { buildNotifications } = require("./builder");
const { Errors } = require("../../../core").Firebase;

exports.fetchNotifications = async (session) => {
  try {
    const { data } = await fetchSecHome(session);
    return buildNotifications(data);
  } catch (error) {
    throw Errors.onError(error);
  }
};
