/* eslint-disable valid-jsdoc */

const { HttpClient, HttpStatus } = require("../../../core").Http;

exports.singIn = (credentials) => HttpClient.request({
  url: "https://sistemasunip.unip.br/api-autenticacao/autenticacao/login",
  method: "post",
  headers: { "Content-Type": "application/json" },
  data: credentials,
  validateStatus: HttpStatus.Ok,
});

exports.fetchSystems = (token) => HttpClient.request({
  url: "https://sistemasunip.unip.br/api-autenticacao/sistemas/usuario",
  headers: { "Authorization": token },
  validateStatus: HttpStatus.Ok,
});

exports.fetchStudentProfile = (cookie) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/CadastroSecretariaOnline/CadastroSecretariaOnline",
  headers: { "Cookie": cookie },
  validateStatus: HttpStatus.Ok,
});

exports.fetch = (config) => HttpClient.request(config);
