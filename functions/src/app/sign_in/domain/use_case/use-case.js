/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {Errors} = require("up-core").Firebase;
const _ = require("lodash");
const Repository = require("../../data/respository/repository");
const SecUseCase = require("./sec-use-case");
const EadUseCase = require("./ead-use-case");

exports.signIn = (credentials) => fetchStudent(credentials)
    .then(onFetchStudent)
    .then(fetchSystems)
    .then(onFetchSystems)
    .then(fetchSec)
    .catch(Errors.onError);

async function fetchStudent(credentials) {
  const response = await Repository.signIn(credentials);
  return {credentials, response};
}

function onFetchStudent({credentials, response}) {
  const loginData = response.data;
  if (loginData["valida"] === true) {
    return {credentials, loginData};
  }
  throw new Errors.AuthorizationError(loginData["mensagemInvalida"]);
}

async function fetchSystems({credentials, loginData}) {
  const base64 = Buffer.from(`br.unip.central-aluno:${loginData["token"]}`).toString("base64");
  const authentication = `Basic ${base64}`;
  const response = await Repository.fetchSystems(authentication);
  return {credentials, loginData, response};
}

function onFetchSystems({credentials, loginData, response}) {
  const systemsData = response.data;
  const sec = _.find(systemsData, {"id": 142});
  const secEad = _.find(systemsData, {"id": 143});
  if (!_.isNil(sec)) {
    const secUrl = sec["url"];
    return {loginData, systemsData, secUrl, isEad: false};
  } else if (!_.isNil(secEad)) {
    return {credentials, systemsData, isEad: true};
  } else {
    throw new Errors.ServiceUnavailableError();
  }
}

async function fetchSec({credentials, loginData, systemsData, secUrl, isEad}) {
  if (isEad) {
    return EadUseCase.fetchSec(credentials, systemsData);
  } else {
    return SecUseCase.fetchSec(secUrl, loginData, systemsData);
  }
}

