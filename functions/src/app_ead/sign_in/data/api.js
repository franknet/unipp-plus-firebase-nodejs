const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.singIn = (credentials) => request({
  url: "https://gfa.unip.br/aluno/auth",
  method: "post",
  headers: {"Content-Type": "application/x-www-form-urlencoded"},
  data: credentials,
  validateStatus: Status.ok,
});

exports.fetchContract = (cookie, userCode) => request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/cod_aluno/${userCode}/verifica_exibe_contrato_login`,
  headers: {"Cookie": cookie},
  validateStatus: Status.ok,
});

exports.fetchUser = (cookie, userId) => request({
  url: `https://gfa.unip.br/aluno/apix/api/rest/alunos/user/${userId}`,
  headers: {"Cookie": cookie},
  validateStatus: Status.ok,
});
