/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const Error = require("../../../utils/https-errors");
const _ = require("lodash");
const repository = require("../data/repository");
const eadSignInUseCase = require("../../../app_ead/sign_in/domain/use-case");
const {buildUser, parseUserImageSrc} = require("./builder");
// const {log} = require("../../../utils/logger");

exports.signIn = async function(credentials) {
  const user = await repository.signIn({
    "identificacao": credentials["id"],
    "senha": credentials["password"],
  });
  if (!user["valida"]) {
    throw Error.authorizationError(user["mensagemInvalida"]);
  }
  return await fetchSystems(user["token"], credentials, user);
};

async function fetchSystems(token, credentials, user) {
  const authentication = "Basic " + Buffer.from("br.unip.central-aluno:" + token).toString("base64");
  const result = await repository.fetchSystems(authentication);
  const systems = result["systems"];

  const sec = _.find(systems, {"id": 142});
  const secEad = _.find(systems, {"id": 143});

  if (!_.isNil(secEad)) {
    return await eadSignInUseCase.signIn(credentials, systems);
  }
  if (_.isNil(sec)) {
    throw Error.serviceUnavaliableError();
  }
  return await fetchSec(result["cookie"], sec["url"], user, systems);
}

async function fetchSec(cookie, url, user, systems) {
  const result = await repository.fetchSec(cookie, url);
  const secCookie = result["cookie"];
  const secHomeUrl = result["home-url"];

  await repository.fetchHome(secCookie, secHomeUrl);
  await saveUserPhoto(secCookie, user);

  return {
    "cookie": secCookie,
    "user": buildUser(user, systems),
  };
}

async function saveUserPhoto(cookie, user) {
  const photoFile = await repository.userPhotoFile(user["identificacao"]);
  if (photoFile.exists()[0]) {
    return false;
  }
  const html = await repository.fetchStudentPhoto(cookie);
  let base64Image = parseUserImageSrc(html);
  base64Image = base64Image.split(";base64,").pop();
  return repository.saveUserImage(photoFile, base64Image);
}

