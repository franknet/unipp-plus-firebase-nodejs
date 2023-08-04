/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const _ = require("lodash");
const cheerio = require("cheerio");

const genderStatusMessage = {
  "M": {
    true: "Matriculado",
    false: "Não Matriculado",
  },
  "F": {
    true: "Matriculada",
    false: "Não Matriculada",
  },
};

exports.buildUser = function(user, systems) {
  return {
    "rg": user["identificacao"],
    "name": user["nomeUsuario"],
    "gender": user["sexo"],
    "photo": user["foto"],
    "status": validateStatus(user),
    "isEad": false,
    "cardId": cardId(systems),
    "course": course(user),
  };
};

function validateStatus(user) {
  return {
    "message": genderStatusMessage[user["sexo"]][user["situacao"] == "nao_matriculado"],
    "code": user["situacao"] == "nao_matriculado" ? 0 : 1,
  };
}

function cardId(systems) {
  return {
    "type": "web",
    "url": _.get(_.find(systems, {"id": 325}), "url", null),
  };
}

function course(user) {
  return {
    "id": user["cursoCod"],
    "name": user["curso"],
    "classCode": user["turmaPrincipal"],
    "grade": user["serie"],
    "unit": user["unidade"],
  };
}

exports.parseUserImageSrc = function(html) {
  const $ = cheerio.load(html);
  return $(".img-circle").first().attr("src");
};
