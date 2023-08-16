/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const logger = require("firebase-functions/logger");

exports.logObject = (object) => console.log("LOGGER:\n" + JSON.stringify(object, null, 4));
exports.log = (any) => console.log("LOGGER:\n" + any);
/**
 * @param {Error} error
 */
exports.trackError = (error) => logger.error(error);
