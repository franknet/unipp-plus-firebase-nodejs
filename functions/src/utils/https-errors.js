/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {AxiosError} = require("axios");
const {HttpsError} = require("firebase-functions").https;

class SessionExpired extends HttpsError {
  constructor() {
    super("deadline-exceeded", "Sessão expirada!");
  }
}

class ServiceUnavaliableError extends HttpsError {
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
  if (error instanceof HttpsError) {
    return error;
  } else if (error instanceof AxiosError) {
    return validateAxiosError(error);
  } else {
    return new HttpsError("internal", error.message, error.stack);
  }
};

/**
 * @param {AxiosError} error
 * @return {HttpsError}
 */
function validateAxiosError(error) {
  const statusCode = error.response.status;
  if (statusCode >= 400) {
    return new ServiceUnavaliableError();
  } else if (statusCode == 302) {
    return new SessionExpired();
  } else {
    return new HttpsError("internal", error.message, error.stack);
  }
}

module.exports = {
  SessionExpired,
  ServiceUnavaliableError,
  UnknownError,
  FileAlreadyExists,
  AuthorizationError,
  onError,
};
