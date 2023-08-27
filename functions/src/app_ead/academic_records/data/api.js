/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.fetchCourseInfo = (session) => request({
  url: `https://gfa.unip.br/aluno/apix/matricula/aluno/${session["user"]["id"]}/listarHistoricoSimplificado`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

exports.fetchDisciplines = (session) => request({
  url: `https://gfa.unip.br/aluno/apix/matricula/aluno/${session["user"]["id"]}/listarCabecalhoHistorico`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});
