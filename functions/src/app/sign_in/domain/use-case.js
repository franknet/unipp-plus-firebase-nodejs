/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const _ = require("lodash");
const { Errors } = require("../../../core").Firebase;
const Repository = require("../data/repository");
const EadUseCase = require("../../../app_ead/sign_in/domain/use-case");
const Builder = require("./builder");

exports.signIn = async (credentials) => {
  return await fetchStudent(credentials)
  .then(signInResponseHandler)
  .then(fetchSystems)
  .then(fetchSystemsResponseHandler)
  .catch(errorhandler);
};

async function fetchStudent(credentials) {
  const response = await Repository.signIn(credentials);
  return { credentials, response };
}

function signInResponseHandler({ credentials, response }) {
  const { data } = response;
  if (data["valida"] === true) {
    return { credentials, loginData: data };
  } else {
    throw new Errors.AuthorizationError(data["mensagemInvalida"]);
  }
}

async function fetchSystems({ credentials, loginData }) {
  const base64 = Buffer.from(`br.unip.central-aluno:${loginData["token"]}`).toString("base64");
  const authentication = `Basic ${base64}`;
  const response = await Repository.fetchSystems(authentication);
  return { credentials, loginData, response };
}

async function fetchSystemsResponseHandler({ credentials, loginData, response }) {
  const { data } = response;
  const sec = _.find(data, { "id": 142 });
  const secEad = _.find(data, { "id": 143 });
  if (!_.isNil(sec)) {
    const secUrl = sec["url"];
    return await fetchSec(secUrl, loginData, data);
  } else if (!_.isNil(secEad)) {
    return await fetchEadSec(credentials, data);
  } else {
    throw new Errors.ServiceUnavaliableError();
  }
}

async function fetchSec(secUrl, loginData, systemsData) {
  const cookieSession = await Repository.fetchSec(secUrl);
  return {
    "data": {
      "cookie": cookieSession,
      "user": Builder.buildUser(loginData, systemsData),
    },
  };
}

async function fetchEadSec(credentials, systemsData) {
  return await EadUseCase.signIn(credentials, systemsData);
}

function errorhandler(error) {
  throw Errors.onError(error);
}

