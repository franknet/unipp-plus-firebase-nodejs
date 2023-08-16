/* eslint-disable valid-jsdoc */

const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.singIn = (credentials) => request({
  url: "https://sistemasunip.unip.br/api-autenticacao/autenticacao/login",
  method: "post",
  headers: {"Content-Type": "application/json"},
  data: credentials,
  validateStatus: Status.Ok,
});

exports.fetchSystems = (token) => request({
  url: "https://sistemasunip.unip.br/api-autenticacao/sistemas/usuario",
  headers: {"Authorization": token},
  validateStatus: Status.Ok,
});

exports.fetchStudentPhoto = (cookie) => request({
  url: "https://sec2.unip.br/NovaSecretaria/CadastroSecretariaOnline/CadastroSecretariaOnline",
  headers: {"Cookie": cookie},
  validateStatus: Status.Ok,
});

/**
 * @param {{
 * cookie: any,
 * url: string,
 * validateStatus: ((int) => boolean)
 * }} config
 */
exports.fetch = (config) => request({
  url: config.url,
  headers: {"Cookie": config.cookie},
  validateStatus: config.validateStatus,
});
