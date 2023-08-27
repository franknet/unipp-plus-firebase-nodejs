const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.singIn = (credentials) => request({
  url: "https://gfa.unip.br/aluno/auth",
  method: "post",
  headers: {"Content-Type": "application/x-www-form-urlencoded"},
  data: credentials,
  validateStatus: Status.Ok,
});

exports.fetchContract = (cookie, userRg) => request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/cod_aluno/${userRg}/verifica_exibe_contrato_login`,
  headers: {"Cookie": cookie},
  validateStatus: Status.Ok,
});

exports.fetchUser = (cookie, userId) => request({
  url: `https://gfa.unip.br/aluno/apix/api/rest/alunos/user/${userId}`,
  headers: {"Cookie": cookie},
  validateStatus: Status.Ok,
});
