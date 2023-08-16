/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {AuthorizationError, ServiceUnavaliableError, onError} = require("../../../utils/https-errors");
const {trackError} = require("../../../utils/logger");
const _ = require("lodash");
const repository = require("../data/repository");
const eadSignInUseCase = require("../../../app_ead/sign_in/domain/use-case");
const {buildUser, findPhotoSrc} = require("./builder");
// const {logObject} = require("../../../utils/logger");

exports.signIn = async function(credentials) {
  try {
    const {data} = await repository.signIn({
      identificacao: credentials["id"],
      senha: credentials["password"],
    });
    const isValid = _.defaultTo(data["valida"], false);
    if (!isValid) {
      throw new AuthorizationError(data["mensagemInvalida"]);
    } else {
      return await fetchSystems(credentials, data);
    }
  } catch (error) {
    throw onError(error);
  }
};

async function fetchSystems(credentials, loginData) {
  const authentication = "Basic " + Buffer.from("br.unip.central-aluno:" + loginData["token"]).toString("base64");
  const {headers, data} = await repository.fetchSystems(authentication);
  const sec = _.find(data, {"id": 142});
  const secEad = _.find(data, {"id": 143});
  if (!_.isNil(secEad)) {
    return await eadSignInUseCase.signIn(credentials, data);
  }
  if (_.isNil(sec)) {
    throw new ServiceUnavaliableError();
  }
  return await fetchSec(headers["set-cookie"], sec["url"], loginData, data);
}

async function fetchSec(cookie, secUrl, loginData, systemsData) {
  const {headers} = await repository.fetchSec(cookie, secUrl);
  const secCookie = headers["set-cookie"];
  const secHomeUrl = headers["location"];

  await repository.fetchSec(secCookie, secHomeUrl);
  await saveUserPhoto(secCookie, loginData);

  return {
    "cookie": secCookie,
    "user": buildUser(loginData, systemsData),
  };
}

async function saveUserPhoto(cookie, user) {
  try {
    const file = repository.userPhotoFile(user["identificacao"]);
    const exists = await file.exists()[0];
    if (exists) {
      return false;
    } else {
      const html = await repository.fetchStudentPhoto(cookie);
      const base64Image = findPhotoSrc(html).split(";base64,").pop();
      return repository.saveUserImage(file, base64Image);
    }
  } catch (error) {
    trackError(error);
    return false;
  }
}
