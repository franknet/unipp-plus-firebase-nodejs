/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.fetchGrades = (session) => request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/boletim`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

exports.fetchReleasedGrades = (session) => request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/ultimasNotas`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

exports.fetchAttendanceDetails = (session, config) => request({
  url: "https://gfa.unip.br/aluno/apix/pessoas/lista_detalhes_frequencia",
  method: "post",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Cookie": session["cookie"],
  },
  json: config,
  validateStatus: Status.Ok,
});
