/* eslint-disable valid-jsdoc */

const { HttpClient, HttpStatus } = require("../../../core").Http;

exports.singIn = (credentials) => HttpClient.request({
  url: "https://sistemasunip.unip.br/api-autenticacao/autenticacao/login",
  method: "post",
  headers: { "Content-Type": "application/json" },
  data: {
    "identificacao": credentials["id"],
    "senha": credentials["password"],
  },
  validateStatus: HttpStatus.Ok,
});

exports.fetchSystems = (token) => HttpClient.request({
  url: "https://sistemasunip.unip.br/api-autenticacao/sistemas/usuario",
  headers: { "Authorization": token },
  validateStatus: HttpStatus.Ok,
});

exports.fetchSec = (url) => new Promise((resolve, reject) => {
  HttpClient.request({
    url: url,
    validateStatus: HttpStatus.Redirect
  })
  .then((response) => {
    const cookie = response["headers"]["set-cookie"];
    const newSecUrl = response["headers"]["location"];
    
    HttpClient.request({
      url: newSecUrl,
      headers: { "Cookie": cookie },
      validateStatus: HttpStatus.Redirect,
    })
    .then(resolve(cookie))
    .catch(reject)
  })
  .catch(reject)
});

exports.fetchStudentProfile = (cookie) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/CadastroSecretariaOnline/CadastroSecretariaOnline",
  headers: { "Cookie": cookie },
  validateStatus: HttpStatus.Ok,
});
