/* eslint-disable valid-jsdoc */

const UserCase = require("./domain/use_case/use-case");

exports.signInHandler = (request) => UserCase.signIn(request.data);
