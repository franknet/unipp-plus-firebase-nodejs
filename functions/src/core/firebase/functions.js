/* eslint-disable valid-jsdoc */
const {firestore, https, identity} = require("firebase-functions/v2");

const opts = {
  region: "southamerica-east1",
  enforceAppCheck: false,
  maxInstances: 10,
  secrets: ["PAYMENT_SERVICE_API_SECRET"],
};

exports.onCall = (handler) => https.onCall(opts, handler);
exports.onRequest = (handler) => https.onRequest(opts, handler);
exports.beforeUserSignedIn = (handler) =>
  identity.beforeUserSignedIn(opts, handler);
exports.onProductCreated = (handler) =>
  firestore.onDocumentCreated(
      opts.merge({document: "products/{productId}"}),
      handler,
  );
