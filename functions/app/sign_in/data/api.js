
const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.singIn = (credentials) => {
  return request({
    url: "https://sistemasunip.unip.br/api-autenticacao/autenticacao/login",
    method: "post",
    headers: {"Content-Type": "application/json"},
    data: credentials,
    validateStatus: Status.Ok,
  });
};

exports.fetchSystems = (token) => {
  return request({
    url: "https://sistemasunip.unip.br/api-autenticacao/sistemas/usuario",
    headers: {"Authorization": token},
    validateStatus: Status.Ok,
  });
};

exports.fetchStudentPhoto = (cookie) => {
  return request({
    url: "https://sec2.unip.br/NovaSecretaria/CadastroSecretariaOnline/CadastroSecretariaOnline",
    headers: {"Cookie": cookie},
    validateStatus: Status.Ok,
  });
};

exports.fetchResource = (cookie, url, validateStatus) => {
  return request({
    url: url,
    headers: {"Cookie": cookie},
    validateStatus: (status) => {
      return status == validateStatus;
    },
  });
};


