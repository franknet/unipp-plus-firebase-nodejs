/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const _ = require("lodash");
const { Errors, Logger } = require("../../../core").Firebase;
const Repository = require("../data/repository");
const eadSignInUseCase = require("../../../app_ead/sign_in/domain/use-case");
const { buildUser, findPhotoSrc } = require("./builder");

exports.signIn = async (credentials) => {
  try {
    const { data } = await Repository.signIn({
      "identificacao": credentials["id"],
      "senha": credentials["password"],
    });
    const isValid = _.defaultTo(data["valida"], false);
    if (!isValid) {
      throw new Errors.AuthorizationError(data["mensagemInvalida"]);
    }
    return await fetchSystems(credentials, data);
  } catch (error) {
    throw Errors.onError(error);
  }
};

async function fetchSystems(credentials, loginData) {
  const authentication = "Basic " + Buffer.from("br.unip.central-aluno:" + loginData["token"]).toString("base64");
  const { headers, data } = await Repository.fetchSystems(authentication);
  const sec = _.find(data, { "id": 142 });
  const secEad = _.find(data, { "id": 143 });
  if (!_.isNil(secEad)) {
    return await eadSignInUseCase.signIn(credentials, data);
  }
  if (_.isNil(sec)) {
    throw new Errors.ServiceUnavaliableError();
  }
  return await fetchSec(headers["set-cookie"], sec["url"], loginData, data);
}

async function fetchSec(cookie, secUrl, loginData, systemsData) {
  const { headers } = await Repository.fetchSec(cookie, secUrl);
  const secCookie = headers["set-cookie"];
  const secHomeUrl = headers["location"];
  await Repository.fetchSec(secCookie, secHomeUrl);
  return {
    "data": {
      "cookie": secCookie,
      "user": buildUser(loginData, systemsData),
    },
  };
}

