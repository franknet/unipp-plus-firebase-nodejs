/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {AxiosError} = require("axios");
const {HttpsError} = require("firebase-functions").https;
const Logger = require("../firebase/logger");

class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
    this.body = {
      "message": this.message,
    };
    this.headers = {"Content-Type": "application/json"};
  }

  /**
   * @param {import ("express").Response} response
   */
  sendTo(response) {
    response.status(this.statusCode).header(this.headers).send(this.body);
  }
}

/**
 * @param {Error} error
 * @returns {ApiError}
 */
const parseError = (error) => {
  Logger.debug("Error: ", error.stack);

  if (error instanceof ApiError) {
    return error;
  }
  if (error instanceof AxiosError) {
    return validateAxiosError(error);
  }
  if (error instanceof Error) {
    return new ApiError(404, "Ocorreu um erro inesperado!");
  }
};

/**
   * @param {import ("axios").AxiosError} error
   * @returns {ApiError}
   */
const validateAxiosError = (error) => {
  const statusCode = error.response.status;
  if (statusCode >= 500) {
    return new ServiceUnavailableError();
  }
  if (statusCode === 302) {
    return new SessionExpired();
  }
  if (statusCode === 401) {
    return new AuthorizationError("Acesso não autorizado");
  }
  return new ApiError(error.response.status, error.message);
};

class SessionExpired extends ApiError {
  constructor() {
    super(302, "Sessão expirada!");
  }
}

class ServiceUnavailableError extends ApiError {
  constructor() {
    super(500, "Serviço indisponível!");
  }
}

class UnknownError extends ApiError {
  constructor() {
    super(400, "Ocorreu um erro inesperado!");
  }
}

class AuthorizationError extends ApiError {
  constructor(message) {
    super(401, message);
  }
}

class FileAlreadyExists extends HttpsError {
  constructor() {
    super("already-exists", "Arquivo já existente!");
  }
}

/**
 * @param {Error | import ("axios").AxiosError} error
 * @returns {ApiError}
 */
const onError = (error) => {
  Logger.trackError(error);
  if (error instanceof ApiError) {
    throw error;
  } else if (error instanceof AxiosError) {
    throw validateAxiosError(error);
  } else {
    throw new ApiError(404, error.message);
  }
};

module.exports = {
  ApiError,
  SessionExpired,
  ServiceUnavailableError,
  UnknownError,
  FileAlreadyExists,
  AuthorizationError,
  parseError,
  onError,
};
