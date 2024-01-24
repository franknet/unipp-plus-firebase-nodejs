/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const { HttpClient, HttpStatus } = require("../../../core").Http;

exports.singIn = (credentials) => HttpClient.request({
  url: "https://gfa.unip.br/aluno/auth",
  method: "post",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  data: credentials,
  validateStatus: HttpStatus.Ok
});

exports.fetchContract = (cookie, userRg) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/cod_aluno/${userRg}/verifica_exibe_contrato_login`,
  headers: { "Cookie": cookie },
  validateStatus: HttpStatus.Ok
});

exports.fetchUser = (cookie, userId) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/api/rest/alunos/user/${userId}`,
  headers: { "Cookie": cookie },
  validateStatus: HttpStatus.Ok
});
