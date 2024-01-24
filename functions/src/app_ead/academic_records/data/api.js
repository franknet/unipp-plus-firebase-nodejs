/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const { HttpClient, HttpStatus } = require("../../../core").Http;

exports.fetchCourseInfo = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/matricula/aluno/${session["user"]["id"]}/listarHistoricoSimplificado`,
  headers: { "Cookie": session["cookie"] },
  validateStatus: HttpStatus.Ok
});

exports.fetchDisciplines = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/matricula/aluno/${session["user"]["id"]}/listarCabecalhoHistorico`,
  headers: { "Cookie": session["cookie"] },
  validateStatus: HttpStatus.Ok
});
