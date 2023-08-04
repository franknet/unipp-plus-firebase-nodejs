/* eslint-disable valid-jsdoc */
const {https} = require("firebase-functions/v2");

/**
 * @param {functionsV2.CallableRequest} handler
 * @returns {functionsV2.CallableFunction}
 */
exports.onCall = (handler) => https.onCall({
  region: "southamerica-east1",
  enforceAppCheck: false,
  maxInstances: 10,
}, handler);
