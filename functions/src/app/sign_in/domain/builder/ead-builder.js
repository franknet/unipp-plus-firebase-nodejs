/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const _ = require("lodash");

const gender = {
  "F": "Feminino",
  "M": "Masculino",
};

exports.build = (loginData, systemsData, contractData, userData) => {
  const user = userData["content"][0];
  const isContractSigned = contractData["valor"];
  const userStatus = (isContractSigned ? "SignContract" : user["semestre"]) == null ? "Enroll" : user["situacaoAluno"];

  return {
    "id": user["id"],
    "rg": user["matricula"],
    "name": user["nomeAluno"],
    "gender": gender[user["sexo"]],
    "photo": user["foto"],
    "status": userStatus,
    "isEad": true,
    "cardId": cardId(systemsData),
    "course": course(user),
    "pendentRegister": loginData["cadastroPendente"],
  };
};

function cardId(systems) {
  return {
    "type": "pdf",
    "url": _.get(_.find(systems, {"id": 153}), "url", null),
  };
}

function course(user) {
  return {
    "id": user["codCurso"],
    "name": user["nomeCurso"],
    "class": user["turma"],
    "grade": user["serie"],
    "year": user["ano"],
    "semester": user["semestre"],
  };
}
