/* eslint-disable valid-jsdoc */
const {https} = require("firebase-functions/v2");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} handler
 */
exports.onCall = (handler) => https.onCall({
  region: "southamerica-east1",
  enforceAppCheck: false,
  maxInstances: 10,
}, handler);
