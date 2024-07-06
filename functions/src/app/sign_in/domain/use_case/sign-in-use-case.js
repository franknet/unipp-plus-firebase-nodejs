/* eslint-disable max-len */

const repository = require("../../data/respository");
const {AuthorizationError} = require("up-core").Http.Errors;

exports.signIn = (credentials) => repository
    .signIn(credentials)
    .then(validateLogin);

const validateLogin = (response) => {
  const {data} = response;
  if (data["valida"] !== true) {
    throw new AuthorizationError(data["mensagemInvalida"]);
  }
  if (data["cadastroPendente"] === true) {
    throw new AuthorizationError("Você possui pendencias cadastrais, acesse o portal do aluno da UNIP!");
  }
  return data;
};
