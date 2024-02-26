/* eslint-disable valid-jsdoc */
const {https} = require("firebase-functions/v2");
const {beforeUserSignedIn} = require("firebase-functions/v2/identity");

const opts = {
  region: "southamerica-east1",
  enforceAppCheck: false,
  maxInstances: 10,
  secrets: ["PAYMENT_SERVICE_API_SECRET"],
};

exports.onCall = (handler) => https.onCall(opts, handler);
exports.beforeUserSignedIn = (handler) => beforeUserSignedIn(opts, handler);
