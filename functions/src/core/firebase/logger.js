/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const logger = require("firebase-functions/logger");
const isDebug = process.env["FIREBASE_DEBUG_MODE"] === "true";

exports.trackError = (error) => logger.error(error);
exports.debug = (tag, args) => {
  if (!isDebug) {
    return;
  }
  console.log("unip-plus-2: " + tag);
  if (args instanceof Object) {
    console.log(JSON.stringify(args, null, 4));
  } else {
    console.log(args);
  }
  console.log("\n");
};
