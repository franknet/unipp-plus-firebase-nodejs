/* eslint-disable valid-jsdoc */
const {signIn} = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.signInHandler = (request) => signIn(request.data);
