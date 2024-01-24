/* eslint-disable valid-jsdoc */

const { signIn } = require("./domain/use-case");

exports.signInHandler = (request) => signIn(request.data);
