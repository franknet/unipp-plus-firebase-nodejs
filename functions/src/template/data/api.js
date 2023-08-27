/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.fetch = (session) => request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/boletim`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

