/* eslint-disable max-len */

const repository = require("../../data/respository/repository");
const {AuthorizationError} = require("up-core").Http.Errors;

exports.fetchStudent = async (credentials) => {
  const {data} = await repository.signIn(credentials);
  validate(data);
  return data;
};

const validate = (loginData) => {
  if (loginData["valida"] !== true) {
    throw new AuthorizationError(loginData["mensagemInvalida"]);
  }
  if (loginData["cadastroPendente"] === true) {
    throw new AuthorizationError("Você possui pendencias cadastrais, acesse o portal do aluno da UNIP!");
  }
};

