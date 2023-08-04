/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const _ = require("lodash");
const {HttpsError} = require("firebase-functions").https;
// const {logObject} = require("./logger");

const sessionExpiredError = () => new HttpsError("deadline-exceeded", "Sessão expirada!");
const serviceUnavaliableError = () => new HttpsError("unavailable", "Serviço indisponível");
const unknownError = () => new HttpsError("unknown", "Ocorreu um erro inesperado!");
const authorizationError = (message) => new HttpsError("permission-denied", message);

/**
 *
 * @param {Error} error
 * @returns {HttpsError}
 */
const internalError = (error) => validateError(error);

/**
 *
 * @param {Error} error
 * @returns {HttpsError}
 */
function validateError(error) {
  // logObject(error);
  if (typeof error == HttpsError) {
    return error;
  }
  const status = _.get(error, "response.status", null);
  if (_.isNil(status)) {
    return new HttpsError("internal", error.message);
  }
  if (status == 302) {
    return sessionExpiredError();
  }
  return serviceUnavaliableError();
}

module.exports = {
  sessionExpiredError,
  serviceUnavaliableError,
  unknownError,
  authorizationError,
  internalError,
};
