const {request} = require("../../../utils/http-client");

exports.singIn = (credentials) => {
  return request({
    url: "https://gfa.unip.br/aluno/auth",
    method: "post",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    data: credentials,
  });
};

exports.fetchContract = (cookie, userCode) => {
  return request({
    url: `https://gfa.unip.br/aluno/apix/pessoas/cod_aluno/${userCode}/verifica_exibe_contrato_login`,
    headers: {"Cookie": cookie},
  });
};

exports.fetchUser = (cookie, userId) => {
  return request({
    url: "https://gfa.unip.br/aluno/apix/api/rest/alunos/user/" + userId,
    headers: {"Cookie": cookie},
  });
};
