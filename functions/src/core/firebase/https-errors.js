/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {AxiosError} = require("axios");
const {HttpsError} = require("firebase-functions").https;
const Logger= require("./logger");

class SessionExpired extends HttpsError {
  constructor() {
    super("deadline-exceeded", "Sessão expirada!");
  }
}

class ServiceUnavailableError extends HttpsError {
  constructor() {
    super("unavailable", "Serviço indisponível!");
  }
}

class UnknownError extends HttpsError {
  constructor() {
    super("unknown", "Ocorreu um erro inesperado!");
  }
}

class AuthorizationError extends HttpsError {
  constructor(message) {
    super("permission-denied", message);
  }
}

class FileAlreadyExists extends HttpsError {
  constructor() {
    super("already-exists", "Arquivo já existente!");
  }
}

/**
 * @param {Error} error
 * @returns {HttpsError}
 */
const onError = (error) => {
  Logger.trackError(error);
  if (error instanceof HttpsError) {
    throw error;
  } else if (error instanceof AxiosError) {
    throw validateAxiosError(error);
  } else {
    throw new HttpsError("internal", error.message, error.stack);
  }
};

function validateAxiosError(error) {
  const statusCode = error.response.status;
  if (statusCode >= 500) {
    return new ServiceUnavailableError();
  }
  if (statusCode === 302 | 401) {
    return new SessionExpired();
  }
  return new HttpsError("internal", error.message, error.stack);
}

module.exports = {
  SessionExpired,
  ServiceUnavailableError,
  UnknownError,
  FileAlreadyExists,
  AuthorizationError,
  onError,
};
