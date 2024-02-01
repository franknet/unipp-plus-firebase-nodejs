/* eslint-disable valid-jsdoc */

const {HttpClient} = require("up-core").Http;

exports.singIn = (credentials) => HttpClient.request({
  url: "https://sistemasunip.unip.br/api-autenticacao/autenticacao/login",
  method: "post",
  headers: {"Content-Type": "application/json"},
  data: {
    "identificacao": credentials["id"],
    "senha": credentials["password"],
  },
});

exports.fetchSystems = (token) => HttpClient.request({
  url: "https://sistemasunip.unip.br/api-autenticacao/sistemas/usuario",
  headers: {"Authorization": token},
});
