/* eslint-disable valid-jsdoc */

const {signIn} = require("./domain/use-case");
const Error = require("../../utils/https-errors");

/**
 *
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.signInHandler = async function(request) {
  try {
    return await signIn(request.data);
  } catch (error) {
    throw Error.internalError(error);
  }
};
