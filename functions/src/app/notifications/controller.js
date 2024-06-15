/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {fetchNotifications} = require("./domain/use-case");


exports.fetchNotificationsHandler = (request) => fetchNotifications(request);
