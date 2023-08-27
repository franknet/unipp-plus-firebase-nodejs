/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {fetchNotifications} = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchNotificationsHandler = (request) => fetchNotifications(request.data);
